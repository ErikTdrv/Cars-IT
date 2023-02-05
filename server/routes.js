const router = require('express').Router();
const authcontroller = require('./controllers/auth')
const carcontroller = require('./controllers/car');
const specialcontroller = require('./controllers/special');

router.get('/', (req, res) => {
    res.json('Working pro0perly...')
})
router.use(authcontroller)
router.use(specialcontroller)
router.use('/cars', carcontroller)
    
module.exports = router;