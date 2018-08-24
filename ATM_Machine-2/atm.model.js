const mongoose = require('mongoose');

const atmSchema = new mongoose.Schema({
    atmID: {
        type: Number,
        required: true,
        unique: true
    },
    cashInMachine: {
        type: Number,
        required: true
    },
    twoThousand: {
        type: Number,
        required: true
    },
    fiveHundred: {
        type: Number,
        required: true
    },
    hundred: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ATM", atmSchema);