const car = require("../models/Car")
require('dotenv').config()
const addCar = async (car, id) => {
    try {
        car.owner = id;
        return await car.create({ ...car })
    } catch (error) {
        throw new Error(error)
    }
}
const getAllCars = async () => {
    return await car.find({})
}
const getOneCar = async (id) => {
    return await car.findById(id).populate('owner')
}
const getProfileCars = async (_id) => {
    return await car.find({ owner: _id })
}
const editCar = async (id, data) => {
    try {
        return await car.findByIdAndUpdate(id, { ...data }, { runValidators: true })
    } catch (error) {
        throw new Error(error)
    }
}
const deleteACar = async (id) => {
    await car.findByIdAndDelete(id)
}
const getTop3Cars = async () => {
    const cars = await car.find({}).sort({ price: -1 }).limit(3)
    return cars
}


module.exports = {
    getTop3Cars,
    deleteACar,
    editCar,
    getProfileCars,
    getOneCar,
    getAllCars,
    addCar,
}