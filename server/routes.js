const router = require('express').Router();
const authController = require('./controllers/authController')
const carController = require('./controllers/carController');

router.get('/', (req, res) => {
    // req.headers['X-Authorization'] = 'asdjpoiasdqi9h402rjpm'
    let token = req.headers['X-Authorization'] | 'nothing'
    res.json(token)
    // res.end()
})
router.use('/cars', carController)
router.use(authController)
    
module.exports = router;