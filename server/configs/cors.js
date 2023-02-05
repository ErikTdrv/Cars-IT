module.exports = () => (req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'https://carsit-fe.ew.r.appspot.com');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Authorization, X-RapidAPI-Key, X-RapidAPI-Host, Origin, X-Requested-With, Accept, Cookie"');
    next();
};