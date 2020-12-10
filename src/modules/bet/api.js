const jwt = require('jsonwebtoken')
const betsRepo = require('./repository')
const weekBetsUsesCases = require('../weekBets/use-cases')
const weekBet = require('../weekBets/models/weekBet')

module.exports = function (router) {

    router.post('/', async (req, res, next) => {
        const userId = jwt.decode(req.headers.authorization)._id
        const bet = {
            ...req.body,
            user: userId
        }

        const userBet = await betsRepo.getUserBet(userId, req.body.weekGames)
        
        if (userBet) {
            res.status(200)
            return res.json({ msg: 'Vous avez déjà parier cette semaine', data: {}})
        }

        return betsRepo.insertBet(bet)
            .then(result => {
                res.status(201)
                res.json({ msg: 'Votre pari a bien été pris en compte', data: result })
            })
            .catch(err => next(err))
    })

    router.get('/results', (req, res, next) => {
        // const user_id = jwt.decode(req.headers.authorization)._id
        return weekBetsUsesCases.getCurrentWeekBetsPopulated()
            .then(async weekBets => {
                if (! weekBets) {
                    res.status(200)
                    return res.json({ msg: 'No active week Bet !' })
                }

                result = await weekBetsUsesCases.generateWeekBetsResults(weekBets)
                return res.json({ msg: 'result bets !', data: result })
            })        
            .catch(err => next(err))
    })

    return router
}