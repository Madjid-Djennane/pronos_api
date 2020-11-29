const usersUseCases = require('./use-cases')
const userRepo = require('./repository')
const teamUsesCases = require('../teams/use-cases')

module.exports = function (router) {

    router.post('/new_user', function (req, res, next) {
        let new_user
        usersUseCases.createUser(req.body)
            .then(user => {
                new_user = user
            })
            .then(() => {
                res.status(201)
                return res.json({
                    msg: 'User created'
                })
            })
            .catch(async err => {
                try { await userRepo.deleteOne({ _id: user._id }) } catch (e) { }
                return next(err)
            })

        
    })

    router.post('/login', async function (req, res, next) {
        try {
            const { email, password } = req.body
            
            const user = await userRepo.getUserWithEmail({ email: email.toLowerCase() })

            if (!user) {
                res.status(404)
                return res.json({ err: 'User does not exist.' })
                /* const err = new Error('User does not exist.')
                err.code = 404
                throw err */
            }
            if (user.verified === false) {
                res.status(404)
                return res.json({ err: 'User not verified.' })

                /* const err = new Error('User not verified.')
                err.code = 403
                throw err */
            }

            // check if password matches
            user.comparePassword(password, async function (err, isMatch) {
                if (err) {
                    return next(err)
                 }

                if (!isMatch) {
                    const error = new Error('User does not exist.')
                    error.code = 404
                    return next(error)
                }

                // if user is found and password is right create a token
                const token = await user.generateJwt()
                // return the information including token as JSON
                res.json({ msg: 'Signed in', data: { token: token } })
            })
        } catch (err) {
            next(err)
        }
    })

    return router
}