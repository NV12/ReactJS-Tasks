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

exports.withdraw = (req, res) => {
    console.log("Inside update: ");
    console.log("Update req.body: ", req.body);

    const userID = {
        _id: req.body.userID ,
    }
    console.log("userID", userID);

    let updateUser = new atmUser({
        _id: req.body.userID,
        cashAvailable: req.body.balance - req.body.withdrawedAmount 
    });

    atmUser.findOneAndUpdate(userID, updateUser, (err, user) => {
        if (err) {
            console.log("Update Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("AtmUSER updated successfully!");
            res.send(user);
        }
    });



}
