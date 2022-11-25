const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
})
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
    .then((hash) =>{
         this.password = hash
         return next()
    })
})
const User = new mongoose.model('User', userSchema);
module.exports = User;