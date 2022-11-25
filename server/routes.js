const server = require('./environment');
const jwt = require('jsonwebtoken')
const router = require('express').Router();

router.get('/', (req, res) => {
    // req.headers['X-Authorization'] = 'asdjpoiasdqi9h402rjpm'
    let token = req.headers['X-Authorization'] | 'nothing'
    res.json(token)
    // res.end()
})
router.post('/', (req, res) => {
    const email = 'eriktdrv@gmail.com';
    const password = '1234567890';
    const _id = '123456asdfg'
    const payload = {
        email,
        _id
    };

    const accessToken = jwt.sign(payload, server.SECRET_KEY);
    res.status(201).json(accessToken)
    // console.log(accessToken)
})
    
module.exports = router;