const weekBetsUsesCases = require('./use-cases')
const weekBetRepo = require('./repository')


module.exports = function (router) {
    
    // generate a list of match and a weekBet (with the list)
    router.get('/generate', async function(req, res, next) {
        const currentWeekBets = await weekBetsUsesCases.getAllWeekBetsPopulated()
        if (currentWeekBets.length) {
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
        return weekBetsUsesCases.getCurrentWeekBetsPopulated()
            .then(weekBets => {
                res.status(200)
                res.json({ data: weekBets })
            })
            .catch(err => next(err))
    })

    // get all week bet
    router.get('/all', function(req, res, next) {
        return weekBetsUsesCases.getAllWeekBetsPopulated()
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

    return router
}