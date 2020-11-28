const morgan = require('morgan')

/**
 *  Morgan: custom logger for http requests
 */ 
module.exports = function(app) {
    if (process.env.NODE_ENV != 'test') {
    // Does not log requests in test environment
        morgan.token('body', function(req) {
            return JSON.stringify(req.body) // log request body content
        })
        app.use(
            morgan(function(tokens, req, res) {
                return [tokens.date(req, res, 'iso'), tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), tokens.body(req, res)].join(
                    ' '
                )
            })
        )
    }
}
