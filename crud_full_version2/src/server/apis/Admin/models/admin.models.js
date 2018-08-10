const mongoose = require('mongoose');

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

/* NOTE:  Must use function here to pass the context */

adminSchema.pre('save', function (next) {
    let bcryptGenPassword = require('./../../../../utils/bcrypt.admin.password');
    
    /* NOTE:  Must use arrow function here to pass the context */

    bcryptGenPassword.generatePassword(this.adminPassword, (err, password) => {
        if (err) {
            console.log("Error is there: ", err);
        } else {
            this.adminPassword = password;
            next();
        }
    });
    // console.log("after caling bcrypt: ", this);
});

module.exports = mongoose.model("Admin", adminSchema);