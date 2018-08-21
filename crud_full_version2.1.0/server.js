const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// This package is required for parsing multipart/form-data
const multer = require('multer');

const dbConfig = require('./config/config');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

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

// Importing passport configuration
require('./src/utils/passport')(passport);

// Serving static files
app.use('/', express.static(__dirname + '/src/client/public'));
// app.use(express.static(__dirname + '/src/client'));
// console.log()
// app.use(express.static(__dirname + '/files'));
app.use(cookieParser());

// Limiting request size to 200mb(which includes the data being set with theh request)
app.use(bodyParser.json({
    limit: '200mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '200mb'
}));

// Storing session in database
app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 1 * 24 * 60 * 60
    }),
    secret: 'NEVER_SHARE_IT',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//  Setting headers for the request required for allowing CROS and other errors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Session-Name, Session-Password');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Configuring multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname+'/src/client/public');
      },
    filename: function(req, file, callback) {
        // console.log("Inside multer config: req: ", req);
        console.log("FILE IS: ", file);
        callback(null, `${new Date()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// For ensuring admin is logged in
const auth = require('./src/utils/auth');
app.use((req, res, next) => {
    // Only allow the login page to render before logging in
    // console.log("YO!");
    if (req.originalUrl === "/admins/login") next();
    else auth.ensureLoggedIn(req, res, next);
});

// Sending index.html to start of the application
app.get('/', (req, res) => {
    console.log("Hey there! You are at the root");
    res.sendFile('/index.html');

    // NOTE: RES.SEND IS STILL NOT WORKING!
    // res.send("Hi there!");
});

// Importing routes
require('./src/server/apis/Employee/routes/employee.routes')(app, upload);
require('./src/server/apis/Admin/routes/admin.routes')(app, passport);

app.listen(3000, () => {
    console.log("Go to localhost:3000 on your browser");
    // console.log("__Dirname", __dirname);
});