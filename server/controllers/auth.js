const { register, login } = require('../services/user');
const cloudinary = require('cloudinary');
const uploader = require("../services/multer");
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
router.get('/logout', (req, res) => {
    // api.logout(req.user.token);
    res.status(204).end();
});
router.get('/user', (req, res) => {
    const user = req.user;
    if(user){
        res.status(200).json(user)
    }
})
module.exports = router;