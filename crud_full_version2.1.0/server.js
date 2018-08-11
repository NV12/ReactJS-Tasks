const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

let app = express();

require('./connection.js');
require('./src/utils/passport')(passport);

app.use('/', express.static(__dirname + '/src/client/public'));
app.use(express.static(__dirname + '/src/client'));

// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Middlewares for passport
app.use(session({secret: 'NEVER_SHARE_IT', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//  Setting headers for the request required for allowing CROS and other errors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.get('/', (req, res) => {
    console.log("Hey there! You are at the root");
    // res.send("Welcome! Its my house, stay alert. Nazar hati, durghatana ghati...");
    res.sendFile('/index.html');
});

require('./src/server/apis/Employee/routes/employee.routes')(app);
require('./src/server/apis/Admin/routes/admin.routes')(app, passport);

app.listen(3000, () => {
    console.log("Go to localhost:3000 on your browser");
    // console.log("__Dirname", __dirname);
});