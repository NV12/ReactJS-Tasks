let dbConfig = require('./config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {useNewUrlParser: true });
mongoose.connection.on('error', () => {
    console.log("Error connecting server! Goodbye!");
});
mongoose.connection.once('open', () => {
    console.log("There we go! I am on!");
});

module.exports = mongoose;