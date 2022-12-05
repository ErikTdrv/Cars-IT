const Car = require("../models/Car")

const addCar = async (car) => {
    try {
        return await Car.create({...car})
    } catch (error) {
        return error
    }
}
const getAllCars = async () => {
    return await Car.find({})
}
const getOneCar = async (id) => {
    return await Car.findById(id)
}
const getProfileCars = async (name) => {
    return await Car.find({owner: name})
}
const editCar = async (id, data) => {
    try {
        return await Car.findByIdAndUpdate(id, {...data}, {runValidators: true})
    } catch (error) {
        return error
    }
}
const deleteACar = async (id) => {
    await Car.findByIdAndDelete(id)
}
const getTop3Cars = async () => {
    const cars = await Car.find({}).sort({price: -1}).limit(3)
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