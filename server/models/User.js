const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        minlength: [4, 'Username should have at least 4 characters!'],
        maxlength: [10, 'Username cannot have more than 10 characters!'],
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
        minlength: [6, 'Password should have at least 6 characters!'],
        maxlength: [12, 'Password cannot have more than 12 characters!'],
    },
    cars: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Car',
        }
    ],
    favouriteCars: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Car',
        }
    ]
})
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash
            return next()
        })
})
const user = new mongoose.model('User', userSchema);
module.exports = user;