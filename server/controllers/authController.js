const { register, login } = require('../services/userService');

const router = require('express').Router();


//Authentification routes
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await register(username, email, password);
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error})
    }
    res.end()
})
router.get('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error})
    }
    res.end()
})
router.get('/logout', (req, res) => {
    // api.logout(req.user.token);
    res.status(204).end();
});
module.exports = router;