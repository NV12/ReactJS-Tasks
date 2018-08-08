const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model("Employee", employeeSchema);