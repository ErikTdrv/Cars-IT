const { getByVin, getIPInfo } = require('../services/specialService');


const router = require('express').Router();

router.post('/myvin', async (req, res) => {
    try {
        const { vin } = req.body;
        const data = await getByVin(vin)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/geolocation', async (req, res) => {
    const { ip } = req.body;
    try {
        const data = await getIPInfo(ip)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
    
})
module.exports = router;