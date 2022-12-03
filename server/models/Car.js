const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        //Mercedes-Benz
        required: true,
        type: String,
        minlength: [3, 'You must have at least 3 characters!']
    },
    model: {
        //S-Class
        required: true,
        type: String,
        minlength: [3, 'You must have at least 3 characters!']
    },
    imageUrl: {
        required: true,
        type: String,
    },
    year: {
        required: true,
        type: Number,
        min: [1950, 'Car year must be newer than 1950\'s!'],
        max: [2022, 'Car year cannot be in the future!']
    },
    description: {
        required: true,
        type: String,
        minlength: [10, 'Description should have at least 10 characters!'],
        maxlength: [100, 'Description shouldn\'t have more than 100 characters!'],

    },
    price: {
        required: true,
        type: Number,
        min: [500, 'Car should be more expensive than 500$!'],
    }
});

const Car = new mongoose.Model('Car', carSchema);
module.exports = Car;