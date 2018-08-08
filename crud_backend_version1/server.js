const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(express.static(__dirname + './src/client/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./connection.js');

app.get('/', (req, res) => {
    console.log("Hey there! You are at the root");
    // res.send("Welcome! Its my house, stay alert. Nazar hati, durghatana ghati...");
    res.sendFile(__dirname + '/src/client/public/index.html');
});

require('./src/server/apis/Employee/routes/employee.routes')(app);

app.listen(3000, () => {
    console.log("Go to localhost:3000 on your browser");
    console.log("__Dirname", __dirname);
});