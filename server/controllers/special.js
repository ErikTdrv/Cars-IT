const { getByVin, getIPInfo} = require('../services/special');


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


router.post('/geolocation', async (req, res) => {
    const ip= req.body.ip;
    try {
        const data = await getIPInfo(ip)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})
module.exports = router;