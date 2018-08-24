const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./db.config');
const mongoose = require('mongoose');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
});
mongoose.connection.on('error', () => {
    console.log("Error connecting server! Goodbye!");
});
mongoose.connection.once('open', () => {
    console.log("There we go! I am on!");
});

app.use(bodyParser.json({
    // limit: '200mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
    // limit: '200mb'
}));

//  Setting headers for the request required for allowing CROS and other errors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Session-Name, Session-Password');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


// app.use('/', express.static(__dirname + '/src/client/public'));

app.get('/', (req, res) => {
    console.log("Hey there! You are at the root");
    // res.sendFile('/index.html');

    // NOTE: RES.SEND IS STILL NOT WORKING!
    res.send("Hi there!");
});

require('./atm.route')(app);
require('./atmUser.route')(app);

app.listen(3000, () => {
    console.log("Go to localhost:3000 on your browser");
    // console.log("__Dirname", __dirname);
});