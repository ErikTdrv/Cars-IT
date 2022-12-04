const Car = require("../models/Car")

const addCar = async (car) => {
    return Car.create({car})
}
module.exports = {
    addCar,
}