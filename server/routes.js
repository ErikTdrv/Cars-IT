const router = require('express').Router();
const authcontroller = require('./controllers/authcontroller')
const carcontroller = require('./controllers/carcontroller');
const specialcontroller = require('./controllers/specialcontroller');

router.get('/', (req, res) => {
    res.json('Working...')
})
router.use(specialcontroller)
router.use('/cars', carcontroller)
router.use(authcontroller)
    
module.exports = router;