const { WeekBet } = require('./models/weekBet')

const insertOne = params => {
    return WeekBet.insertMany([params])
}

const getCurrentWeekBets = () => {
    const dateTime = new Date()
    return WeekBet.find({ startDate: {'$lt': dateTime}, endDate: {'$gte': dateTime} }).populate({
        path: 'gamesList',
        populate: {
            path: 'firstTeam secondTeam'
        }
    }).lean()
}

const getAllWeekBets = () => {
    return WeekBet.find({}).populate({
        path: 'gamesList',
        populate: {
            path: 'firstTeam secondTeam'
        }
    }).lean()
}

const deleteOneById = id => {
    return WeekBet.deleteOne({ _id: id })
}


module.exports = {
    insertOne,
    getCurrentWeekBets,
    getAllWeekBets,
    deleteOneById
}