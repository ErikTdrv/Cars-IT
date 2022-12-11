const router = require('express').Router();
const authController = require('./controllers/authController')
const carController = require('./controllers/carController');
const specialController = require('./controllers/specialController');
const { getUserIP } = require('./services/specialService');

router.get('/', (req, res) => {
    res.json('Working...')
})
router.use(specialController)
router.use('/cars', carController)
router.use(authController)
    
module.exports = router;