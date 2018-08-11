const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let adminSchema = new mongoose.Schema({
    adminEmail: {
        type: String,
        required: true,
        unique: true
    },
    adminPassword: {
        type: String,
        required: true,
        unique: true
    }
});

/*---------------- Using sync methods for creating hash password ------------------*/

adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

adminSchema.methods.validPassword = function(password) {
    console.log("inside validPassword method: ");
    console.log("inside validPassword method: password", typeof(password));
    console.log("inside validPassword method: this.password", typeof(this.adminPassword));
    // console.log("bcyrpt validate: ", bcrypt.compareSync(password, this.adminPassword));
    return bcrypt.compareSync(password, this.adminPassword);
};

module.exports = mongoose.model("Admin", adminSchema);