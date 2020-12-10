const { WeekBet } = require('./models/weekBet')

const insertOne = params => {
    return WeekBet.insertMany([params])
}

const getCurrentWeekBets = () => {
    const dateTime = new Date()
    // return WeekBet.findOne({ startDate: {'$lt': dateTime}, endDate: {'$gte': dateTime} }).populate({
    return WeekBet.find().sort({ startDate: -1 }).limit(1).populate({
        path: 'gamesList',
        populate: {
            path: 'firstTeam secondTeam'
        }
    }).lean()
}

const getAllWeekBets = () => {
    return WeekBet.find({ status: 'done' }).populate({
        path: 'gamesList',
        populate: {
            path: 'firstTeam secondTeam'
        }
    }).lean()
}

const deleteOneById = id => {
    return WeekBet.deleteOne({ _id: id })
}

const update = params => {
    return WeekBet.findByIdAndUpdate(params._id, params)
}


module.exports = {
    insertOne,
    getCurrentWeekBets,
    getAllWeekBets,
    deleteOneById,
    update
}