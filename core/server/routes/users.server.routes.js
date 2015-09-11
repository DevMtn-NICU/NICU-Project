// routes that have to do with authentication
var usersController = require('../controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    app.post('/user/createParent', usersController.createParent);
    app.post('/user/createContact', usersController.createContact);
    app.post('/user/createNurse', usersController.createNurse);
    app.post('/user/login', passport.authenticate('local'), function(req,res) {
      res.json(req.user);
    });
    app.get('/user', usersController.getUser);
    app.post('/user/edit', usersController.editUser);
    app.get('/user/logout', function(req, res) {
      req.logout();
      res.end();
    });
};
