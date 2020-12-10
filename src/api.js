const express = require('express')
const users = require('./modules/users/api')
const weekBets = require('./modules/weekBets/api')
const bets = require('./modules/bet/api')

module.exports = function() {
    const router = express.Router()

    router.use('/users', users(express.Router()))
    router.use('/weekBets', weekBets(express.Router()))
    router.use('/bets',bets(express.Router()))

    return router
}