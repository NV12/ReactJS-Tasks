const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let adminSchema = new mongoose.Schema({
    adminID: {
        type: Number,
        required: true,
        unique: true
    },
    adminPassword: {
        type: String,
        required: true
    }
});

/*---------------- Using sync methods for creating hash password ------------------*/

adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("Admin", adminSchema);