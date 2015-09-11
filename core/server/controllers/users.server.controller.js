var User = require('../models/user.server.model.js');

module.exports = {
  createParent: function(req, res) {
    var newUser = new User();
    newUser.roles.push("parent");
    newUser.email = req.body.email;
    //hash out password
    newUser.password = newUser.generateHash(req.body.password);
    newUser.parent = {
      access: "parent",
      baby: req.body.babyId
    };
    newUser.save(function(err, user) {
      if (err) return res.status(500).send(err);
      else {
        req.login(user, function(error) {
          res.send(user);
        });
      }
    });
  },

  createContact: function(req, res) {
    var newUser = new User();
    newUser.roles.push("contact");
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

  createNurse: function(req, res) {
    var newUser = new User();
    newUser.roles.push("nurse");
    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.nurse = {
      access: "nurse"
    };
    newUser.save(function(err, user) {
      if (err) return res.status(500).send(err);
      else {
        req.login(user, function(error) {
          res.send(user);
        });
      }
    });
  },

  getUser: function(req, res) {
    User.findById(req.params.userId)
    .populate(parent.baby)
    .exec(function(err, user){
      if (err) res.status(500).send(err);
      else res.send(user);
    });
  },

  editUser: function(req, res) {
    //returns the updated user document
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true, upsert: true}, function(err, user){
      if (err) res.status(500).send(err);
      else res.send(user);
    });
  }
};
