const { register, login, getUnknownUser, logout } = require('../services/user');
const cloudinary = require('cloudinary');
const uploader = require("../services/multer");
const User = require('../models/User');
const router = require('express').Router();


//Authentification routes
router.post('/register', async (req, res) => {
    const data = req.body;
    const { avatarImg } = req.body;
    try {
        if(avatarImg){
            const upload = await cloudinary.v2.uploader.upload(avatarImg, {fetch_format: "auto"});
            data.avatarImg = upload.url
            data.imageId = upload.public_id
        }
        const user = await register(data);
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
    res.end()
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    res.end()
})
router.get('/logout', async (req, res) => {
    await logout()
    res.status(204).end();
});
router.get('/user', async (req, res) => {
    const { token } = req.user;
    let user = await User.findOne({token})
    let userToReturn = {
        _id: user._id,
        username: user.username, 
        email: user.email,
        cars: user.cars,
        favouriteCars: user.favouriteCars,
        avatarImg: user.avatarImg,
        imageId: user.imageId,
    }
    if(user){
        res.status(200).json(userToReturn)
    }
})
router.get('/user/:owner', async (req, res) => {
    const { owner } = req.params;
    try {
        let user = await getUnknownUser(owner);
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
module.exports = router;