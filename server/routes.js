const router = require('express').Router();
const authController = require('./controllers/authController')
const carController = require('./controllers/carController');
const specialController = require('./controllers/specialController')


router.use(specialController)
router.use('/cars', carController)
router.use(authController)
    
module.exports = router;