const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
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
const register = async (data) => {
    const existingEmail = await User.findOne({email: data.email})
    const existingUsername = await User.findOne({username: data.username})

    if(existingEmail){
        throw new Error('Email already exists!')
    }else if(existingUsername){
        throw new Error('Username already exists!')
    }
    const user = await User.create(data)
    return createAccessToken(user)
}
const login = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Invalid email or password!')
    }
    const isUser = await bcrypt.compare(password, user.password)
    if(isUser){
        let userToReturn = await createAccessToken(user)
        userToReturn.avatarImg = user.avatarImg;
        userToReturn.imageId = user.imageId;
        return userToReturn
    }else {
        throw new Error('Invalid email or password!')
    }
}
const updateCarsOnUser = async (_id, carId) => {
    try {
        const user = await User.findById(_id);
        let array = user.cars
        array.push(carId)
        await User.findByIdAndUpdate(_id, {cars: array})
    } catch (error) {
        throw new Error(error)
    }
}
const logout = (token) => {
    blacklist.add(token)
}
const getUnknownUser = async (username) => {
    return await User.findOne({username}).populate('cars');
}
module.exports = {
    getUnknownUser,
    updateCarsOnUser,
    login,
    register,
    createAccessToken,
    validateToken
}
