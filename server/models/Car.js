const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        //Mercedes-Benz
        required: true,
        type: String,
        minlength: [3, 'You should have at least 3 characters!']
    },
    model: {
        //S-Class
        required: true,
        type: String,
        minlength: [2, 'You should have at least 2 characters!']
    },
    hp: {
        required: true,
        type: Number,
    },
    imageUrl: {
        required: true,
        type: String,
    },
    year: {
        required: true,
        type: String,
        min: [1950, 'Car year should be newer than 1950\'s!'],
        max: [2022, 'Car year cannot be in the future!']
    },
    description: {
        required: true,
        type: String,
        minlength: [10, 'Description should have at least 10 characters!'],
        maxlength: [50, 'Description shouldn\'t have more than 50 characters!'],

    },
    price: {
        required: true,
        type: Number,
        min: [500, 'Car should be more expensive than 500$!'],
    },
    owner: {
        required: true,
        type: String,
    }
});

const Car = new mongoose.model('Car', carSchema);
module.exports = Car;