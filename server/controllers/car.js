const user = require('../models/User');
const { addCar, getAllCars, getOneCar, getProfileCars, editCar, deleteACar, getTop3Cars } = require('../services/car');
const { updateCarsOnUser } = require('../services/user');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const userId = req?.user?._id;
        const car = await addCar(data, userId)
        await updateCarsOnUser(userId, car._id)
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
    const _id = req?.user?._id;
    const cars = await getProfileCars(_id)
    res.status(200).json(cars)
    res.end()
})
router.get('/most', async (req, res) => {
    const cars = await getTop3Cars()
    res.status(200).json(cars)
})
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const car = await getOneCar(id);
        if(car){
            res.status(200).json(car)
        }else {
            throw new Error('Invalid car ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const car = await getOneCar(id)
    try {
        if(req?.user._id == car.owner._id){
            await editCar(id, data)
            const updatedCar = await getOneCar(id)
            res.status(200).json(updatedCar)
        }else {
            throw new Error('You are not the owner!')
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
router.delete('/:id', async (req, res) => {
    const user = await user.findById(req.user._id)
    const id = req.params.id;
    if(user.cars.includes(id)){
        let carsArray = user.cars;
        let deletionIndex = carsArray.indexOf(id)
        carsArray.splice(deletionIndex, 1)
        await user.findByIdAndUpdate(req.user._id, {cars: carsArray})
        await deleteACar(id)
        res.status(200).json('Deleted!')
    }else {
        res.status(400).json({error: 'You are not the owner of the car!'})
    }
})

module.exports = router;