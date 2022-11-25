const jwt = require('jsonwebtoken')
const server = require('../environment')
const validateToken = (token) => {
    try {
        const data = jwt.verify(token, server.SECRET_KEY)
        return data
    } catch (error) {
        throw new Error('Invalid access token!')
    }
}
const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const accessToken = jwt.sign(payload, server.SECRET_KEY)
    return {
        email: user.email,
        accessToken,
        _id: user._id
    };
}
module.exports = {
    createAccessToken,
    validateToken
}