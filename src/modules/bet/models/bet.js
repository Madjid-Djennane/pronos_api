const mongoose = require('mongoose')
const { Game } = require('../../games/models/game')
const { WeekBet } = require('../../weekBets/models/weekBet')
const { User } = require('../../users/models/user')

const betSchema = new mongoose.Schema({
    weekBet: { type: mongoose.Schema.Types.ObjectId, ref: 'WeekBet' },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bet: { type: Number, enum: [0, 1, 2] } // 1 -> team1 won, 2 -> team2 won, 0 -> draw
})

const Bet = mongoose.model('Bet', betSchema)

module.exports = { Bet }