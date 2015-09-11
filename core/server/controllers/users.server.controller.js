var User = require('../models/user.server.model.js');

module.exports = {
  createParent: function(req, res) {
    var newUser = new User();
    newUser.roles.push("parent");
    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save(function(err, user) {
      if (err) return res.status(500).send(err);
      else {
        req.login(user, function(error) {
          res.send(user);
        });
      }
    });
  },
};
