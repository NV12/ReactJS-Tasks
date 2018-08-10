// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('./../server/apis/Admin/models/admin.models');

module.exports = function(passport) {

    passport.serializeUser(function(admin, done) {
        done(null, admin.adminID);
    });

    passport.deserializeUser(function(adminID, done) {
        Admin.findOne({adminID: adminID}, function(err, admin) {
            done(err, admin);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'adminID',
        passwordField: 'adminPassword',
        passReqToCallback: true
    },
    function(req, adminID, adminPassword, done) {
        Admin.findOne({ 'adminID' : adminID}, function(err, admin) {
            //  If there is any error before anything else
            if(err) return done(err);

            // If no admin found, return the message
            if(!admin) return done(null, false, req.flash('loginMessage', 'No user found.'));

            // If admin found but wrong password
            if(!admin.validPassword(adminPassword))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            // If all goes well, return successfull error
            return done(null, admin);
        })
    }) )
}