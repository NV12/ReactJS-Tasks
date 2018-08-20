module.exports = (app, upload) => {
    console.log("Inside employee.routes.js");
    const employee = require('../controllers/employee.controllers');
    
    app.get('/employees', employee.findAll);

    app.get('/employees/:empID', employee.findOne);

    app.post('/employees/new', upload.single('file'), employee.create);
    
    app.put('/employees/edit/:empID', upload.single('file'), employee.update);

    app.delete('/employees/:empID', employee.delete);

}