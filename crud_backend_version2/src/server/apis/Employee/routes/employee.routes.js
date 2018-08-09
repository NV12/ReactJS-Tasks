module.exports = (app) => {
    console.log("Inside employee.routes.js");
    const employee = require('../controller/employee.controllers');
    
    app.get('/employees', employee.findAll);

    app.get('/employees/:empID', employee.findOne);

    app.post('/employees/new', employee.create);

    app.put('/employees/edit/:empID', employee.update);

    app.delete('/employees/:empID', employee.delete);

}