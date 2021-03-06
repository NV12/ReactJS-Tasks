const LocalStrategy = require('passport-local').Strategy;
const Admin = require('./../server/apis/Admin/models/admin.models');

module.exports = function(passport) {

    console.log("Inside passport");
    // Saving admin id in session
    passport.serializeUser(function(admin, done) {
        console.log("inside serializeUser");
        console.log("admin", admin.id);
        done(null, admin.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log("inside deserializeUser");
        Admin.findById(id, function(err, admin) {
            done(err, admin);
        });
    });

    // Using local-login strategy for authentication
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'adminEmail',
        passwordField: 'adminPassword',
        passReqToCallback: true
    },
    function(req, adminEmail, adminPassword, done) {
        console.log("Inside local strategy: ");
        Admin.findOne({ adminEmail : adminEmail}, function(err, admin) {
            //  If there is any error before anything else
            if(err) {
                console.log("SOME ERROR:", err);
                return done(err);
            }

            // If no admin found, return the message
            if(!admin) {
                console.log("If no admin found, return the message");
                // req.param('errorMessage') = 'No admin found.';
                return done(null, false, {message: 'No user found.'});
            }

            // If admin found but wrong password
            if(!admin.validPassword(adminPassword)) {
                console.log("If admin found but wrong password");
                // req.param('errorMessage') = 'Oops! Wrong password.';
                return done(null, false, {message: 'Oops! Wrong password.'});
            }

            // If all goes well, return successfull error
            console.log("If all goes well, return successfull error");
            return done(null, admin);
        });
    }));
}