module.exports = function (err, req, res, next) {
    console.log(err)
    if (process.env.NODE_ENV !== 'test') {
        console.dir(err, { depth: null })
    }

    res.status(err.statusCode || err.code || err.status || 500).json(
        {
            ...err,
            status: err.status,
            message: err.message,
            stack: err.stack
        }
    )
}
