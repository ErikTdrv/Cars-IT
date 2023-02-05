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
        res.cookie("auth", user.accessToken, { httpOnly: true, secure: true,sameSite: 'none'});
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
        res.cookie("auth", user.accessToken, { httpOnly: true, sameSite: 'none' , secure: true});
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.delete('/logout', async (req, res) => {
    res.clearCookie("auth");
    res.status(204).end();  


    // -- Clearing token from local storage
    // let token = req.user.token;
    // await logout(token)
});
router.get('/user', async (req, res) => {
    let cookie;
    if(req.cookies?.auth){
        cookie = req.user.cookie
    }
    if (cookie) {
        let user = await User.findOne({ token: cookie })
        if(user) {
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
        res.end()
    }
})
router.get('/user/:owner', async (req, res) => {
    const { owner } = req.params;
    try {
        let user = await getUnknownUser(owner);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
module.exports = router;