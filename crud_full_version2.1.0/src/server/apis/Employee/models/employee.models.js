const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    empID: {
        type: Number,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true,
        unique: false
    },
    imgName: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Employee", employeeSchema);