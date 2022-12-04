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
module.exports = {
    getOneCar,
    getAllCars,
    addCar,
}