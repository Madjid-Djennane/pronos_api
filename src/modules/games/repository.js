const { Game } = require('./models/game')

const insert = params => {
    return Game.insert(params)
}

const insertMany = params => {
    return Game.insertMany(params)
}

const findGamesPopulated = () => {
    return Game.find({}).populate('firstTeam secondTeam')
}

const deleteAll = () => {
    return Game.deleteMany({})
}

const update = (params) => {
    return Game.findByIdAndUpdate(params._id, params)
}

module.exports = {
    insert,
    insertMany,
    findGamesPopulated,
    deleteAll,
    update
}