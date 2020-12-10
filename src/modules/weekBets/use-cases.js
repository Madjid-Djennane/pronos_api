const gamesUsesCases = require('../games/use-cases')
const gamesRepo = require('../games/repository')
const weekBetsRepo = require('./repository')
const betsRepo = require('../bet/repository')
const { WeekBet } = require('./models/weekBet')
const weekBet = require('./models/weekBet')

const generateWeekBets = () => {
    return gamesUsesCases.generate()
    .then(games => {
        const gamesIds = games.map(game => game._id)
        
        const today = new Date()
        const inAweek = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
        )

        const weekBet = Object.assign({
            gamesList: gamesIds,
            startDate: today,
            endDate: inAweek
        })

        return weekBetsRepo.insertOne(weekBet)
    })
}

const generateWeekBetsResults = weekBets => {
    console.log(weekBets)
    weekBets.gamesList.forEach(async game => {
        const firstTeamRes = Math.floor(Math.random() * Math.floor(8))
        const secondTeamRes = Math.floor(Math.random() * Math.floor(8))
        
        result = firstTeamRes === secondTeamRes ? 0 : firstTeamRes > secondTeamRes ? 1 : 2

        const score = {
            firstTeamRes: firstTeamRes,
            secondTeamRes: secondTeamRes
        }
        game = {
            ...game,
            score,
            result
        }
        await gamesRepo.update(game)
    })

    weekBets = {
        ...weekBets,
        status: 'done'
    }

    return weekBetsRepo.update(weekBets)
}

const getCurrentWeekBetsPopulated = async (userId) => {
    const weekB = await weekBetsRepo.getCurrentWeekBets()
    let weekBets = weekB[0]
    if (weekBets && weekBets.status === 'done') {
        const userBet = await betsRepo.getUserBet(userId, weekBets._id)
        
        if (! userBet) {
            return weekBets
        }

        weekBets = {
            ...weekBets,
            gamesList: weekBets.gamesList.map(g => {
                return {
                    ...g,
                    win: userBet.bets.find(bet => bet.game.equals(g._id)).user_bet === g.result
                }
            })
        }

        return weekBets
    }

    return weekBets
}

const getAllWeekBetsPopulated = async (userId) => {
    const weekB =  await weekBetsRepo.getAllWeekBets()
    const userBets = await betsRepo.getUserBets(userId)
    console.log(userBets)
    
    const weekBets = weekB.map(weekBet => {
        const userBet = userBets.find(ub => ub.weekGames.equals(weekBet._id))     
        if (userBet) {
            return {
                ...weekBet,
                gamesList: weekBet.gamesList.map(g => ({
                    ...g,
                    win: userBet.bets.find(bet => bet.game.equals(g._id)).user_bet === g.result
                }))
            }
        }

    })

    return weekBets

}

module.exports = {
    generateWeekBets,
    getCurrentWeekBetsPopulated,
    getAllWeekBetsPopulated,
    generateWeekBetsResults
}