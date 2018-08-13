module.exports = (app, passport) => {
    console.log("Inside admin.routes.js");
    const admin = require('./../controllers/admin.controllers');

    // For ensuring admin is logged in
    app.use((req, res, next) => {
        if(req.originalUrl === "/admins/login") next();
        else admin.ensureLoggedIn(req, res, next);
    });


    //  How to take common word ADMINS out of all paths
    
    app.get('/admins/showAll', admin.findAll);

    app.get('/admins/logout', admin.logout);

    app.post('/admins/new', admin.create);

    app.post('/admins/login', passport.authenticate('local-login', {
        failureRedirect: '/admins/login'}),
        function(req, res) {
            res.status(200).send('correct credentials!');
        });

    // Find an admin
    app.get('/admins/:adminID', admin.findOne);

    app.put('/admins/edit/:adminID', admin.update);

    app.delete('/admins/:adminID', admin.delete);
}