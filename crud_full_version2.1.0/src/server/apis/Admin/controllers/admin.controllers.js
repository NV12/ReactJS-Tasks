const Admin = require('../models/admin.models');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    console.log("Inside admin create");

    let admin = new Admin({
        adminID: req.body.adminID
    });

    // Creating hashed password for admin
    admin.adminPassword = admin.generateHash(req.body.adminPassword);
   
    /*   NOTE: We can call save method on admin bcz its an object of Admin  */

    admin.save((err, adminObj) => {
        if (err) {
            console.log("Error in saving admin: ", err);
            res.status(500).send(err)
        } else {
            console.log("after adminPassword: ", admin);
            res.send(adminObj);
        }
    });
};

// Find all admins method
exports.findAll = (req, res) => {
    console.log("Inside admin findAll");

    Admin.find((err, admins) => {
        if (err) {
            console.log("Find Error: ", err);
            res.status(500).send(err)
        } else {
            console.log("admins: ", admins);
            res.send(admins);
        }
    });
};

//  Delete Admin method
exports.delete = (req, res) => {
    console.log("Inside admin delete");
    // console.log("Delete req: ", req);
    console.log("Delete req params: ", req.params);

    const deleteAdminProp = {
        adminID: req.params.adminID
    };
    Admin.findOneAndRemove(deleteAdminProp, (err, adminData) => {
        if (err) {
            console.log("Delete Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Admin deleted successfully!", adminData);
            res.send(adminData);
        }
    });
}

// Finding an Admin
exports.findOne = (req, res) => {
    console.log("Inside admin findOne: ");
    // console.log("findOne req: ", req);
    console.log("findOne req.params: ", req.params);

    const findOneAdminID = {
        adminID: req.params.adminID
    };
    Admin.findOne(findOneAdminID, (err, adminData) => {
        if (err) {
            console.log("FindOne Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Found Admin !", adminData);
            res.send(adminData);
        }
    });
}

// Edit admin methods
exports.update = (req, res) => {
    console.log("Inside admin update: ");
    // console.log("Update req: ", req);
    console.log("Update req.params: ", req.params);

    const updateAdminProp = {
            adminID: req.params.adminID
        },
        newAdmin = {
            adminID: req.body.adminID,
            adminPassword: req.body.adminPassword
        };

    Admin.findOneAndUpdate(updateAdminProp, newAdmin, (err, adminData) => {
        if (err) {
            console.log("Update Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Admin updated successfully!");
            res.send(adminData);
        }
    });
}

exports.login = (req, res, next) => {
    console.log("Inside login method: ");
    console.log("req.params", req.body);
    const findOneAdminID = {
        adminID: req.body.adminID
    };

    Admin.findOne(findOneAdminID, (err, adminData) => {
        if (err) {
            console.log("Error in finding Admin! ", err);
            res.status(500).send(err);
        }

        if (!adminData) {
            console.log("No such admin exists", adminData);
            res.send(adminData);
        } else {
            console.log("Found Admin !", adminData);

            bcrypt.compare(req.body.adminPassword, adminData.adminPassword)
                .then((status) => {
                    if (status) {
                        console.log("You are a correct one!");
                        res.redirect('/admins');
                    } else {
                        res.send("Incorrect admin Password");
                    }
                })
        }
    });
}