const { register, login, getUnknownUser, logout } = require('../services/user');
const cloudinary = require('cloudinary');
const User = require('../models/User');
const blacklisted = require('../models/Blacklisted');
const router = require('express').Router();


//Authentification routes
router.post('/register', async (req, res) => {
    const data = req.body;
    const { avatarImg } = req.body;
    try {
        if (avatarImg) {
            const upload = await cloudinary.v2.uploader.upload(avatarImg, { fetch_format: "auto" });
            data.avatarImg = upload.url
            data.imageId = upload.public_id
        }
        const user = await register(data);
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
    res.end()
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    res.end()
})
router.delete('/logout', async (req, res) => {
    let token = req.user.token;
    await logout(token)
    res.status(204).end();
});
router.get('/user', async (req, res) => {
    let token;
    if(req?.user?.token){
        token = req.user.token
    }
    if (token) {
        let user = await User.findOne({ token })
        let isBlacklisted = await blacklisted.findOne({ token })
        if (isBlacklisted) {
            res.status(400).json({ error: 'User is not valid!' })
        } else if (user) {
            let userToReturn = {
                _id: user._id,
                username: user.username,
                email: user.email,
                cars: user.cars,
                favouriteCars: user.favouriteCars,
                avatarImg: user.avatarImg,
                imageId: user.imageId,
            }
            if (user) {
                res.status(200).json(userToReturn)
            }
        } else {
            res.status(400).json({ error: 'User is not valid!' })
        }
    } else {
        res.status(400).json({ error: 'User is not valid!' })
    }
})
router.get('/user/:owner', async (req, res) => {
    const { owner } = req.params;
    try {
        let user = await getUnknownUser(owner);
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
module.exports = router;