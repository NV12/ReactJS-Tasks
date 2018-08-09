const Employee = require('../models/employee.models');

// Create new employee method
exports.create = (req, res) => {
    console.log("Inside create");
    // console.log("req.body", req.body);

    let employee = new Employee({
        empName: req.body.empName,
        email: req.body.email,
        empID: req.body.empID,
        dob: req.body.dob
    });

    /*   NOTE: We can call save method on employee bcz its an object of Employee  */

    employee.save((err, emp) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err)
        } else {
            console.log("employee: ", emp);
            res.send(emp);
        }
    });
};

// Find all employee method
exports.findAll = (req, res) => {
    console.log("Inside findAll");

    Employee.find((err, employees) => {
        if (err) {
            console.log("Find Error: ", err);
            res.status(500).send(err)
        } else {
            console.log("employee: ", employees);
            res.send(employees);
        }
    });
};

//  Delete Employee method
exports.delete = (req, res) => {
    console.log("Inside delete");
    console.log("Delete req: ", req);
    console.log("Delete req params: ", req.params);

    const deleteEmpProp = {
        empID: req.params.empID
    };
    Employee.findOneAndRemove(deleteEmpProp, (err, emp) => {
        if (err) {
            console.log("Delete Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Employee deleted successfully!", emp);
            res.send(emp);
        }
    });
}

// Finding an employee
exports.findOne = (req, res) => {
    console.log("Inside findOne: ");
    console.log("findOne req: ", req);
    console.log("findOne req.params: ", req.params);

    const findOneEmpID = {
        empID: req.params.empID
    };
    Employee.findOne(findOneEmpID, (err, emp) => {
        if(err) {
            console.log("FindOne Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Found employee !", emp);
            res.send(emp);
        }
    });
}

// Edit employee methods
exports.update = (req, res) => {
    console.log("Inside update: ");
    console.log("Update req: ", req);
    console.log("Update req.params: ", req.params);

    const updateEmpProp = {
            empID: req.params.empID
        },
        newEmp = {
            empName: req.body.empName,
            email: req.body.email,
            empID: req.body.empID,
            dob: req.body.dob
        };

    Employee.findOneAndUpdate(updateEmpProp, newEmp, (err, emp) => {
        if(err) {
            console.log("Update Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Employee updated successfully!");
            res.send(emp);
        }
    });
}