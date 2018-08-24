module.exports = (app) => {
 
    const atmUser = require('./atmUser.controller');
    
    app.post('/atmUser/account', atmUser.add);
    
    app.post('/atmUser/login', atmUser.login);
}