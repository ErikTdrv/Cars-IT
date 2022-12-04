const { addCar, getAllCars } = require('../services/carService');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const car = await addCar(data)
        res.status(201).json(car)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
router.get('/', async (req, res) => {
    const cars = await getAllCars()
    res.status(200).json(cars)
})
module.exports = router;