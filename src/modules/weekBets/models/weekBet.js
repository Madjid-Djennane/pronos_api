const mongoose = require('mongoose')
const { Game } = require('../../games/models/game')

const weekBetSchema = new mongoose.Schema({
    gamesList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] ,
    startDate: { type: Date},
    endDate: { type: Date }
})

weekBetSchema.pre('remove', async function(next) {
    const gamesList = this.getFilter()['gamesList']

    try {
        
        await Game.deleteMany({ _id: gamesList })
        return next()

    } catch (error) {
        console.warn('delete on cascade error: ', error)
    }
    
})

const WeekBet = mongoose.model('weekBet', weekBetSchema)

module.exports = { WeekBet }