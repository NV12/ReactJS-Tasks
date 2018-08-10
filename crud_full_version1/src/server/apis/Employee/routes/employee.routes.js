module.exports = (app) => {
    console.log("Inside employee.routes.js");
    const employee = require('../controller/employee.controllers');
    
    app.get('/employees', employee.findAll);

    app.post('/employees/new', employee.create);

}