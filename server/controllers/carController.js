const { addCar, getAllCars, getOneCar, getProfileCars, editCar, deleteACar, getTop3Cars } = require('../services/carService');
const { updateCarsOnUser } = require('../services/userService');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const id = req.user._id;
        const car = await addCar(data, id)
        await updateCarsOnUser(req.user._id, car._id)
        res.status(201).json(car)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
})
router.get('/', async (req, res) => {
    const cars = await getAllCars()
    res.status(200).json(cars)
})
router.get('/mycars', async (req, res) => {
    const _id = req.user._id;
    const cars = await getProfileCars(_id)
    res.status(200).json(cars)
    res.end()
})
router.get('/most', async (req, res) => {
    const cars = await getTop3Cars()
    res.status(200).json(cars)
})
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const car = await getOneCar(id);
    res.status(200).json(car)
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await editCar(id, data)
        const updatedCar = await getOneCar(id)
        res.status(200).json(updatedCar)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await deleteACar(id)
    res.status(200).json('Deleted!')
})
module.exports = router;