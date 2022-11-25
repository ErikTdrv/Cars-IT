const router = require('express').Router();

router.get('/', (req, res) => {
    req.headers['X-Authorization'] = 'asdjpoiasdqi9h402rjpm'
    console.log(req.headers)
    res.end()
})
    
module.exports = router;