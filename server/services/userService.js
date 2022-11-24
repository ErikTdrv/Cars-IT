const jwt = require('jsonwebtoken')
const server = require('../environment')
const validateToken = (token) => {
    const data = jwt.verify(token, server.SECRET_KEY)
    return data
}

module.exports = {
    validateToken
}