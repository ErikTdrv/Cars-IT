const router = require('express').Router();
const authcontroller = require('./controllers/auth')
const carcontroller = require('./controllers/car');
const specialcontroller = require('./controllers/special');

router.get('/', (req, res) => {
    res.json('Working...')
})
router.use(specialcontroller)
router.use('/cars', carcontroller)
router.use(authcontroller)
    
module.exports = router;