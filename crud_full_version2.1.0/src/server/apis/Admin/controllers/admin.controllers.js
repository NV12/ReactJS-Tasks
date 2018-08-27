const Admin = require('../models/admin.models');
const bcrypt = require('bcrypt-nodejs');

exports.create = (req, res) => {
    console.log("Inside admin create", req.body);
    console.log("req.params", req.params);
    let admin = new Admin();
    admin.adminEmail =  req.body.adminEmail,
    admin.adminPassword =  bcrypt.hashSync(req.body.adminPassword, bcrypt.genSaltSync(8), null)
           
    /*   NOTE: We can call save method on admin bcz its an object of Admin  */
    console.log("Admin:    ", admin);
    admin.save((err, adminObj) => {
        if (err) {
            console.log("Error in saving admin: ", err);
            console.log("AdminOBJ: ", adminObj);
            
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
        _id: req.params.adminID
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
    console.log("findOne req.data: ", req.data);
    console.log("findOne req.body: ", req.body);
    console.log("findOne req.params: ", req.params);
    // console.log("req.statusMessage", req.statusMessage);
    const findOneAdminID = {
        _id: req.params.adminID
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
            _id: req.params.adminID
        },
        newAdmin = {
            adminEmail: req.body.adminEmail,
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

exports.logout = (req, res) => {
    console.log("Inside logout");
    console.log("req.get('adminEmail'): ", req.get('adminEmail'));
    console.log("req.header('adminEmail'): ", req.header('adminEmail'));
    console.log("Request headers: ", req.headers);
    // console.log("REQUEST OBJECT: ", req);
    
    req.session.destroy(err => {
        console.log("Session destroyed");
        res.send('You are logged out!');
    });
}

// exports.login = (req, res, next) => {
//     console.log("Inside login method: ");
//     console.log("req.params", req.body);
//     const findOneAdminID = {
//         _id: req.body.adminID
//     };

//     Admin.findOne(findOneAdminID, (err, adminData) => {
//         if (err) {
//             console.log("Error in finding Admin! ", err);
//             res.status(500).send(err);
//         }

//         if (!adminData) {
//             console.log("No such admin exists", adminData);
//             res.send(adminData);
//         } else {
//             console.log("Found Admin !", adminData);

//             bcrypt.compare(req.body.adminPassword, adminData.adminPassword)
//                 .then((status) => {
//                     if (status) {
//                         console.log("You are a correct one!");
//                         res.redirect('/admins');
//                     } else {
//                         res.send("Incorrect admin Password");
//                     }
//                 })
//         }
//     });
// }