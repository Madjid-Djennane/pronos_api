const gamesUsesCases = require('../games/use-cases')
const weekBetsRepo = require('./repository')
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

const getCurrentWeekBetsPopulated = () => {
    return weekBetsRepo.getCurrentWeekBets()
}

const getAllWeekBetsPopulated = () => {
    return weekBetsRepo.getAllWeekBets()
}

module.exports = {
    generateWeekBets,
    getCurrentWeekBetsPopulated,
    getAllWeekBetsPopulated
}