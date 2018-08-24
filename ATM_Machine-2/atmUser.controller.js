const atmUser = require('./atmUser.model');

// add new User
exports.add = (req, res) => {
    console.log("Inside add");
    console.log("req.body: ", req.body);
   
    let user = new atmUser({
        userName: req.body.userName,
        pin: req.body.pin,
        cashAvailable: req.body.cashAvailable
    });

    /*   NOTE: We can call save method on atmUser bcz its an object of atmUser  */

    user.save((err, userData) => {
        if (err) {
            console.log("Error in adding atmUser: ", err);
            res.send(err);
        } else {
            console.log("atmUser add successfully!: ", userData);
            res.send(userData);
        }
    });
};

// exports.login = (req, res) => {
//     console.log("Inside login");
//     console.log("req.body: ", req.body);


// }

exports.login = (req, res) => {
    console.log("Inside login: ");
    console.log("findOne req.body: ", req.body);

    const userData = {
        userName: req.body.userName,
        pin: req.body.pin
    };

    atmUser.findOne(userData, (err, user) => {
        if (err) {
            console.log("FindOne Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Found user !", user);
            res.send(user);
        }
    });
}

exports.withDraw = (req, res) => {
    console.log("Inside withdraw: ");
    console.log("findOne req.body: ", req.body);

}


exports.update = (req, res) => {
    console.log("Inside update: ");
    console.log("Update req.body: ", req.body);
    console.log("Update req.params: ", req.params);
    console.log("Update req.file", req.file);

    const updateEmpProp = {
        empID: req.params.empID
    },
        newEmp = {
            empName: req.body.empName,
            email: req.body.email,
            empID: req.body.empID,
            dob: req.body.dob
        };

    // if file is not updated, use older one as original
    if (req.body.nofile) newEmp.imgName = req.body.fileName;
    else { 
        newEmp.imgName = req.file.filename; 
    
        // delete the older file
        fs.unlink(path.join(__dirname, '../../../../client/public', req.body.oldFileName), (err) => {
            if (err) {
                console.log("Error in changing file: ", err);
                res.status(500).send(err);
            }
            console.log('successfully deleted old file');
        });
    }

    console.log("newEmp.imgName", newEmp.imgName);

    Employee.findOneAndUpdate(updateEmpProp, newEmp, (err, emp) => {
        if (err) {
            // console.log("Update Error: ", err);
            if(err.message.indexOf("email") != -1)   
                res.status(409).send({errorMessage: 'Plz choose another unique email'})
            else if(err.message.indexOf("empID") != -1)  
                res.status(409).send({errorMessage: "Plz choose another unique ID"});
            else    
                res.status(500).send(err);
            // res.status(500).send(err);
        } else {
            console.log("Employee updated successfully!");
            res.send(emp);
        }
    });
}