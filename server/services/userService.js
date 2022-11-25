const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const server = require('../environment')
const User = require('../models/User')
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
        username: user.username,
    }
    const accessToken = jwt.sign(payload, server.SECRET_KEY)
    return {
        email: user.email,
        username: user.username,
        accessToken,
        _id: user._id
    };
}
const register = async (username, email, password) => {
    const existing = await User.findOne({email})
    if(existing){
        throw new Error('Email already exists!')
    }
    const user = await User.create({username, email, password})
    return createAccessToken(user)
}
const login = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Invalid email or password!')
    }
    const isUser = await bcrypt.compare(password, user.password)
    if(isUser){
        return createAccessToken(user)
    }else {
        throw new Error('Invalid email or password!')
    }
}
module.exports = {
    login,
    register,
    createAccessToken,
    validateToken
}