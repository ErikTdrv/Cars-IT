const mongoose = require('mongoose');
require('dotenv').config()

function initDatabase(){
    return mongoose.connect(process.env.CONNECTIONSTRING);
}

module.exports = initDatabase;  