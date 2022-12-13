const Car = require("../models/Car")
const User = require("../models/User")
require('dotenv').config()
const addCar = async (car, id) => {
    try {
        car.owner = id;
        return await Car.create({ ...car })
    } catch (error) {
        throw new Error(error)
    }
}
const getAllCars = async () => {
    return await Car.find({})
}
const getOneCar = async (id) => {
    return await Car.findById(id).populate('owner addedBy')
}
const getProfileCars = async (_id) => {
    return await Car.find({ owner: _id })
}
const editCar = async (id, data) => {
    try {
        return await Car.findByIdAndUpdate(id, { ...data }, { runValidators: true })
    } catch (error) {
        throw new Error(error)
    }
}
const deleteACar = async (id) => {
    await Car.findByIdAndDelete(id)
}
const getTop3Cars = async () => {
    const cars = await Car.find({}).sort({ price: -1 }).limit(3)
    return cars
}
const addToFavourite = async (userId, carId) => {
    try {
        //Adding car to user
        const user = await User.findById(userId)
        let array = user.favouriteCars;
        array.push(carId)
        console.log(userId)
        console.log(carId)
        await User.findByIdAndUpdate(userId, {favouriteCars: array})
        //Adding user to car
        let car = await Car.findById(carId)
        let carArray = car.addedBy
        carArray.push(userId)
        await Car.findByIdAndUpdate(carId, {addedBy: carArray})
    } catch (error) {
        throw new Error(error)
    }

}
const getFavouriteCars = async (userId) => {
    return await User.findById(userId).populate('favouriteCars')
}

module.exports = {
    getFavouriteCars,
    addToFavourite,
    getTop3Cars,
    deleteACar,
    editCar,
    getProfileCars,
    getOneCar,
    getAllCars,
    addCar,
}
