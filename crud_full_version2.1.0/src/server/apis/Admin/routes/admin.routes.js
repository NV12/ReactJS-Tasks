module.exports = (app, passport) => {
    console.log("Inside admin.routes.js");
    const admin = require('./../controllers/admin.controllers');

    //  How to take common word ADMINS out of all paths

    app.get('/admins', admin.findAll);

    app.get('/admins/logout', admin.logout);

    // New admin
    app.post('/admins/new', admin.create);

    // Admin login
    app.post('/admins/login', passport.authenticate('local-login', {
            failureRedirect: '/admins/login',
            failureFlash : true
        }),
        function (req, res) {
            console.log("Inside passport success");
            console.log("Session user: ", req.user);
            console.log("Session: ", req.session);
            res.status(200).send(req.user);
        });

    // Find an admin
    app.get('/admins/:adminID', admin.findOne);

    // Update admin
    app.put('/admins/edit/:adminID', admin.update);

    app.delete('/admins/:adminID', admin.delete);
}