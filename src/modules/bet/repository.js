const { Bet } = require('./models/bet')

const insertBet = params => {
    const bet = new Bet(params)
    return bet.save()
}

const getUserBet = (userId, weekBetId) => {
    return Bet.findOne({ user: userId, weekGames: weekBetId }).lean()
}

const getUserBets = (userId) => {
    return Bet.find({ user: userId}).lean()
}

module.exports = {
    insertBet,
    getUserBet,
    getUserBets
}