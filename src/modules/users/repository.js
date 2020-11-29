const { User } = require('./models/user')

const createUser = (user) => {
    const newUser = new User(user)
    return newUser.save()
}

const deleteOne = params => {
    return User.deleteOne(params)
}

const getUsers = () => {
    return User.find({}).lean()
}

const getUserWithEmail = (params) => {
    return User.findOne(params)
}

module.exports = {
    createUser,
    deleteOne,
    getUsers,
    getUserWithEmail
}