const Car = require("../models/Car")

const addCar = async (car) => {
    try {
        return await Car.create({...car})
    } catch (error) {
        return error
    }
}
module.exports = {
    addCar,
}