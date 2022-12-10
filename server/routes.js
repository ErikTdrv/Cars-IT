const router = require('express').Router();
const authController = require('./controllers/authController')
const carController = require('./controllers/carController');
const { getByVin } = require('./services/carService');

router.get('/geolocation', (req, res) => {
    console.log('here')
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '453f9c1bd6msh32734b876f80c8bp1aac59jsn6f9ec78a981c',
            'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
        }
    };
    
    fetch('https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=89.25.126.79', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
})
router.post('/myvin', async (req, res) => {
    try {
        const { vin } = req.body;
        const data = await getByVin(vin)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.use('/cars', carController)
router.use(authController)
    
module.exports = router;