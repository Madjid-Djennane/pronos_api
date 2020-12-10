const weekBetsUsesCases = require('./use-cases')
const weekBetRepo = require('./repository')
const gamesUsesCases = require('../games/use-cases')
const jwt = require('jsonwebtoken')

module.exports = function (router) {
    
    // generate a list of match and a weekBet (with the list)
    router.get('/generate', async function(req, res, next) {
        const currentWeekBets = await weekBetsUsesCases.getCurrentWeekBetsPopulated()
        if (currentWeekBets && currentWeekBets.status === 'pending') {
            res.status(403)
            return res.json({ data: 'Already a week bets in progress !'})
        }

        return weekBetsUsesCases.generateWeekBets()
            .then(weekBets => {
                res.status(201)
                res.json({ data: weekBets, length: weekBets.length })
            })
            .catch(err => next(err))
    })


    // get current week bet
    router.get('/current', function(req, res, next) {
        const userId = jwt.decode(req.headers.authorization)._id
        return weekBetsUsesCases.getCurrentWeekBetsPopulated(userId)
            .then(weekBets => {
                res.status(200)
                res.json({ data: weekBets || { status: 'noWeekBet'} })
            })
            .catch(err => next(err))
    })

    // get all week bet
    router.get('/all', function(req, res, next) {
        const userId = jwt.decode(req.headers.authorization)._id
        return weekBetsUsesCases.getAllWeekBetsPopulated(userId)
            .then(weekBets => {
                res.status(200)
                res.json({ data: weekBets })
            })
            .catch(err => next(err))
    })


    router.get('/delete', function(req, res, next) {
        const { weekBetsId } = req.query

        return weekBetRepo.deleteOneById(weekBetsId)
            .then(games => {
                res.json({ data: games })
            })
            .catch(err => next(err))
    })

    router.get('/delete_games', function(req, res, next) {

        return gamesUsesCases.deleteAll()
            .then(games => {
                res.json({ msg: 'games deleted' })
            })
            .catch(err => next(err))
    })

    return router
}