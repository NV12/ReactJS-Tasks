const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use('/', express.static(__dirname + '/src/client/public'));
app.use(express.static(__dirname + '/src/client'));

// app.use()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

require('./connection.js');

app.get('/', (req, res) => {
    console.log("Hey there! You are at the root");
    // res.send("Welcome! Its my house, stay alert. Nazar hati, durghatana ghati...");
    res.sendFile('/index.html');
});

require('./src/server/apis/Employee/routes/employee.routes')(app);
require('./src/server/apis/Admin/routes/admin.routes')(app);

app.listen(3000, () => {
    console.log("Go to localhost:3000 on your browser");
    // console.log("__Dirname", __dirname);
});