module.exports = (app) => {
    console.log("Inside admin.routes.js");
    const admin = require('./../controllers/admin.controllers');

    app.get('/admins', admin.findAll);

    app.get('/admins/:adminID', admin.findOne);

    app.post('/admins/new', admin.create);

    app.post('/admins/login', admin.login);

    app.put('/admins/edit/:adminID', admin.update);

    app.delete('/admins/:adminID', admin.delete);
}