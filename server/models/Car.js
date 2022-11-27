const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        //Mercedes-Benz
    },
    model: {
        //S-Class

    },
    imageUrl: {

    },
    year: {

    },
    description: {

    },
    price: {

    }
});

const Car = new mongoose.Model('Car', carSchema);
module.exports = Car;