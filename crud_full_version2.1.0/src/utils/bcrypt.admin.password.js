let bcrypt = require('bcrypt');

exports.generatePassword = function(str,callback){
    const SALT_ROUNDS = 10;
    // generate a salt
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) return callback(err);
        // hash the password using our new salt
        bcrypt.hash(str, salt, function(err, hash) {
            if (err) return callback(err);
            callback(null,hash);
        });
    });
}