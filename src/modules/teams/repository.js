const { Team } = require('./models/team')

const getTeams = () => {
    return Team.find({}).lean()
}

const getTeamsIds = () => {
    return Team.find({}).select('_id')
}

module.exports = {
    getTeams,
    getTeamsIds
}