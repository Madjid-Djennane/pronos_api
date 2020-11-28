const gameRepo = require('./repository')
const teamRepo = require('../teams/repository')
const { Games, Teams } = require('../../helpers/constants')

const generate = async () => {
    const teams = await teamRepo.getTeamsIds()
    if (teams.length < Teams.COUNT) {
        throw new Error('there are not enough teams !')
    }
    const games = generateRandomGames(teams)
    
    return gameRepo.insertMany(games)
}

const getGamesPopulated = () => {
    return gameRepo.findGamesPopulated()
}

const deleteAll = () => {
    return gameRepo.deleteAll()
}

module.exports = {
    generate,
    getGamesPopulated,
    deleteAll
}

const generateRandomGames = teams => {
    const games = []
    const teamsIds = teams.map(t => t._id)

    for (let i=0; i < Games.COUNT; i+= 1) {
        const firstTeamIndex = Math.floor(Math.random() * teamsIds.length)
        const firstTeam = teamsIds[firstTeamIndex]
        teamsIds.splice(firstTeamIndex, 1)

        const secondTeamIndex = Math.floor(Math.random() * teamsIds.length)
        const secondTeam = teamsIds[secondTeamIndex]
        teamsIds.splice(secondTeamIndex, 1)

        const game = Object.assign({
            firstTeam,
            secondTeam,
            matchDay: new Date()
        })

        games.push(game)
    }

    return games
}