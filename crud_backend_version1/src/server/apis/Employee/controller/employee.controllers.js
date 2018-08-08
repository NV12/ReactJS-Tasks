const Employee = require('../models/employee.models');

// Create new employee method
exports.create = (req, res) => {
    console.log("Inside create");
    console.log("req.body", req.body);
    let employee = new Employee({userName: req.body.userName, email: req.body.email, dob: req.body.dob});

    employee.save((err, emp) => {
        if(err) {
            // console.log("Insiod")
            console.log("Error: ", err);
            res.status(500).send(err)
        } else {
            console.log("employee: ", emp);
            res.send(emp);
        }
    });
};

// Find all employee method
exports.findAll= (req, res) => {
    console.log("Inside findAll");
    Employee.find((err, employees) => {
        if(err) {
            console.log("Error: ", err);
            res.status(500).send(err)
        } else {
            console.log("employee: ", employees);
            res.send(employees);
        }
    });
};

