const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true,
        unique: true
    },
    cashAvailable: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("userAccount", userAccountSchema);