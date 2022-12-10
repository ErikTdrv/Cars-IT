const router = require('express').Router();
const authController = require('./controllers/authController')
const carController = require('./controllers/carController');
const specialController = require('./controllers/specialController');
const { getUserIP } = require('./services/specialService');

router.get('/myipaddress', async (req, res) => {
    const { ip }= await getUserIP();
    console.log(ip)
    res.end()
})
router.use(specialController)
router.use('/cars', carController)
router.use(authController)
    
module.exports = router;