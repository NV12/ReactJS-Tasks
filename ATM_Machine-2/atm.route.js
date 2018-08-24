module.exports = (app) => {
    // console.log("Inside employee.routes.js");
    const atm = require('./atm.controller');
    
    // app.get('/employees', employee.findAll);

    // app.get('/employees/:empID', employee.findOne);

    app.post('/atm/new', atm.add);

    app.post('/atm/withDraw', atm.withDraw);
    
    // app.put('/employees/edit/:empID', upload.single('file'), employee.update);

    // app.delete('/employees/:empID', employee.delete);

}