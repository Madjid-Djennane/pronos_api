require('./plugins/env')
require('./plugins/db')

const express = require('express')
const errorHandler = require('./helpers/error-handler')
const bodyParser = require('body-parser')
const api = require('./api')
const cors = require('cors')
const myMorgan = require('./plugins/morgan')


// express app
const app = express()
// cors
app.use(cors())
app.options('*', cors())
// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// morgan
myMorgan(app)

/* app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
}); */


// Health check
app.get('/', function (req, res) {
    res.json({
        msg: 'Amen to that boys.',
    })
})

// API
app.use('/api/v1', api())

// Error handling
app.use(errorHandler)

process.on('unhandledRejection', (reason, p) => {
    // application specific logging, throwing an error, or other logic here
    throw ('Unhandled Rejection at: Promise', p, 'reason:', reason)
})
// Run server
const port = process.env.PORT || 3003
app.set('port', port)
// kill $(lsof -t -i:3003) : use to kill if EADDR:3003

app.listen(port, () => console.log(`Running on localhost:${port}`))