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

module.exports = {
    createUser,
    deleteOne,
    getUsers
}