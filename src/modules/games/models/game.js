const mongoose = require('mongoose')
const { Team } = require('../../teams/models/team')

const scoreSchema = new mongoose.Schema({
    _id: false,
    firstTeamRes: { type: Number },
    secondTeamRes: { type: Number }
})

const gameSchema = new mongoose.Schema({
    firstTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    secondTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    matchDay: { type: Date },
    result: { type: Number, enum: [0, 1, 2] }, // 1 -> team1 won, 2 -> team2 won, 0 -> draw 
    score: { type: scoreSchema }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = { Game }