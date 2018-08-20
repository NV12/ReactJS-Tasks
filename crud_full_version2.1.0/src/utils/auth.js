exports.ensureLoggedIn = (req, res, next) => {
    console.log("Inside ensureLoggedIn");

    console.log("Request headers: ", req.headers);
    console.log("if condition: ", req.headers['session-name']);
    console.log("req.headers['session-name'] == null", req.headers['session-name'] === 'null');
    
    if(req.headers['session-name'] === 'null' && req.headers['session-password'] === 'null') {
        console.log("Not logged in!");
        // res.redirect('/admins/login');
        res.send("Stay login!");
    } else {
        console.log("Logged in");
        next();
    }
} 