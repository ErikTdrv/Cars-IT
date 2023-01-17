const mongoose = require('mongoose');

const blacklistedSchema = new mongoose.Schema({
    token: {
        required: true,
        type: String,
    }
});

const blacklisted = new mongoose.model('Blacklist', blacklistedSchema);
module.exports = blacklisted;