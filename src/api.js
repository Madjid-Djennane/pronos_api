const express = require('express')
const users = require('./modules/users/api')
const weekBets = require('./modules/weekBets/api')

module.exports = function() {
    const router = express.Router()

    router.use('/users', users(express.Router()))
    router.use('/weekBets', weekBets(express.Router()))

    return router
}