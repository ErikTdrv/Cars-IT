const { addCar, getAllCars, getOneCar } = require('../services/carService');

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
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const car = await getOneCar(id);
    console.log(car)
    res.status(200).json(car)
})
// router.get(':id', async (req, res) => {
//     const id = req.params.id;
//     const car = await getOneCar(id);
//     console.log(car)
//     res.status(200).json(car)
// })
module.exports = router;