const { addCar, getAllCars, getOneCar, getProfileCars } = require('../services/carService');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        data.owner = req.user.username;
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
router.get('/mycars', async (req, res) => {
    const username = req.user.username;
    const cars = await getProfileCars(username)
    res.status(200).json(cars)
    res.end()
})
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const car = await getOneCar(id);
    res.status(200).json(car)
})
module.exports = router;