const teamRepo = require('./repository')

const getTeams = () => {
    return teamRepo.getTeams()
}

const getTeamsIds = () => {
    return teamRepo.getTeamsIds()
}

module.exports = {
    getTeams,
    getTeamsIds
}