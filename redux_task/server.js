const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Session-Name, Session-Password');
    // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.get('/randomNumber', (req, res) => {
    console.log("Inside randomNumber");
    let randomNumber = Math.floor(Math.random() * Math.floor(10));
    console.log("randomNumber", randomNumber);
    res.send({ans: randomNumber});
});

app.listen(3000, () => {
    console.log("Go to localhost:3000 on your browser");
});