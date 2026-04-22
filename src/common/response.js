const createError = require('http-errors');

module.exports.Response = {
    success: (res, status = 200, message = "Ok", body = {}) => {
        res.status(status).json({ message, body })
    },
    error: (res, error = null) => {
        const { statusCode, message } = error ? error : new createError.InternalServerError(); // crea por defecto el error 500
        res.status(statusCode).json({ message })
    }
}