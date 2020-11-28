const userRepo = require('./repository')

const createUser = (user) => {
    return userRepo.createUser({ ...user })
}

module.exports = {
    createUser
}