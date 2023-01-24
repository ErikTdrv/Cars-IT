const User = require('../models/User');
const cloudinary = require('cloudinary');
const uploader = require("../services/multer");
const { addCar, getAllCars, getOneCar, getProfileCars, editCar, deleteACar, getTop3Cars, addToFavourite, getFavouriteCars, removeFromFavourites } = require('../services/car');
const { updateCarsOnUser } = require('../services/user');

const router = require('express').Router();

router.post('/', uploader.array('carPhotos'), async (req, res) => {
    const base64 = req.body.data.base64;
    const data = req.body.data;
    try {
        data.carImages = []
        if (base64?.length > 0) {
            for (let el of base64) {
                const uploaded = await cloudinary.v2.uploader.upload(el, { fetch_format: "auto" });
                let objectToPush =  {
                    imageUrl: uploaded.url,
                    imageId: uploaded.public_id,
                }
                data.carImages.push(objectToPush)
            }
        }else {
            data.carImages.push(data.imageUrl)
        }
        console.log(data)
        const userId = req?.user?._id;
        const car = await addCar(data, userId)
        await updateCarsOnUser(userId, car._id)
        res.status(201).json(car)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
    res.end()
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
router.delete('/favourites/:id', async (req, res) => {
    try {
        const userId = req.user._id;
        const carId = req.params.id;
        await removeFromFavourites(userId, carId)
        res.status(200).json('Success')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/favourites/:id', async (req, res) => {
    try {
        const userId = req.user._id;
        const carId = req.params.id;
        await addToFavourite(userId, carId)
        res.status(200).json('Success')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/favourite-cars', async (req, res) => {
    let userId = req.user._id
    try {
        let cars = await getFavouriteCars(userId)
        res.status(200).json(cars?.favouriteCars)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const car = await getOneCar(id);
        if (car) {
            res.status(200).json(car)
        } else {
            throw new Error('Invalid car ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.put('/:id', uploader.array('carPhotos'), async (req, res) => {
    console.log('here')
    const id = req.params.id;
    console.log(req.body)
    const base64 = req.body.base64;
    const data = req.body;

    const car = await getOneCar(id)
    try {
        data.carImages = []
        if (req?.user._id == car.owner._id) {
            if (base64) {
                for (let el of base64) {
                    const uploaded = await cloudinary.v2.uploader.upload(el, { fetch_format: "auto" });
                    let objectToPush =  {
                        imageUrl: uploaded.url,
                        imageId: uploaded.public_id,
                    }
                    data.carImages.push(objectToPush)
                }
            }else {
                data.carImages.push(data.imageUrl)
            }
            await editCar(id, data)
            const updatedCar = await getOneCar(id)
            res.status(200).json(updatedCar)
        } else {
            throw new Error('You are not the owner!')
        }
       
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.delete('/:id', async (req, res) => {
    const user = await User.findById(req.user._id)
    const id = req.params.id;
    if (user.cars.includes(id)) {
        let carsArray = user.cars;
        let deletionIndex = carsArray.indexOf(id)
        carsArray.splice(deletionIndex, 1)
        await User.findByIdAndUpdate(req.user._id, { cars: carsArray })
        let car = await deleteACar(id)
        if (car.imageId) {
            await cloudinary.v2.uploader.destroy(car.imageId)
        }
        res.status(200).json('Deleted!')
    } else {
        res.status(400).json({ error: 'You are not the owner of the car!' })
    }
})

module.exports = router;
