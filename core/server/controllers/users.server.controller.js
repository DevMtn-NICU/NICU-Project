var User = require('../models/user.server.model.js');
var Q = require('q');
var Baby = require('../models/baby.server.model.js');

module.exports = {
   createParent: function (req, res) {
      var newUser = new User();
      newUser.roles.push("parent");
      newUser.email = req.body.email;
      //hash out password
      newUser.password = newUser.generateHash(req.body.password);
      newUser.parent = {
         access: "parent",
         baby: req.body.babyId
      };
      newUser.save(function (err, user) {
         if (err) return res.status(500).send(err);
         else {
            req.login(user, function (error) {
               res.send(user);
            });
         }
      });
   },
   // called from parent Settings page. Receives a "level" param from front end; needs to populate levels array in baby doc.
   createContact: function (req, res) {
      console.log(req.body);
      var existingUserId, level, userExists;
      level = req.body.level;
      (function findExistingUser() {
         var deferred = Q.defer();
         User.findOne({
            'email': req.body.email
         }, function (err, existingUser) {
            if (err) return res.status(500).send(err);
            else if (existingUser) {
               existingUserId = existingUser._id;
               User.findByIdAndUpdate(existingUserId, {
                  $push: {
                     'contact': {
                        baby: req.body.babyId,
                        level: level
                     }
                  }
               }, {
                  new: true
               }, function (err, user) {
                  if (err) return res.status(500).send(err);
                  if (user.roles.indexOf("contact") === -1) {
                     User.findByIdAndUpdate(existingUserId, {
                        $push: {
                           'roles': 'contact'
                        }
                     }, function (err) {
                        if (err) return res.status(500).send(err);
                     });
                  }
                  if (level === "level2") {
                     Baby.findByIdAndUpdate(req.body.babyId, {
                        $push: {
                           'level2': existingUserId
                        }
                     }, function (err, baby) {
                        if (err) return res.status(500).send(err);
                        res.send(user);
                        userExists = true;
                        deferred.resolve();
                     });
                  } else if (level === "level1") {
                     Baby.findByIdAndUpdate(req.body.babyId, {
                        $push: {
                           'level1': existingUserId
                        }
                     }, function (err, baby) {
                        if (err) return res.status(500).send(err);
                        res.send(user);
                        userExists = true;
                        deferred.resolve();
                     });
                  }
               });
            } else {
               deferred.resolve();
            }
         });
         return deferred.promise;
      }()).then(function () {
         if (!userExists) {
            var newUser = new User();
            newUser.roles.push("contact");
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.name = req.body.name;
            newUser.contact.push({
               baby: req.body.babyId,
               level: req.body.level
            });
            newUser.save(function (err, user) {
               if (err) return res.status(500).send(err);
               else {
                  if (level === "level2") {
                     Baby.findByIdAndUpdate(req.body.babyId, {
                        $push: {
                           'level2': user._id
                        }
                     }, function (err, baby) {
                        if (err) return res.status(500).send(err);
                        res.send(user);
                     });
                  } else if (level === "level1") {
                     Baby.findByIdAndUpdate(req.body.babyId, {
                        $push: {
                           'level1': user._id
                        }
                     }, function (err, baby) {
                        if (err) return res.status(500).send(err);
                        res.send(user);
                     });
                  }
               }
            });
         }
      });
   },

   removeContact: function (req, res) {
      if (req.body.babyAuth.level === 1) {
         User.findByIdAndUpdate(req.params.id, {
            $pull: {
               "contact": {
                  baby: req.body.babyAuth.id,
                  level: "level1"
               }
            }
         }, function (err, user) {
            if (err) return res.status(500).send(err);
            else {
               Baby.findByIdAndUpdate(req.body.babyAuth.id, {
                  $pull: {
                     "level1": req.params.id
                  }
               }, {
                  new: true
               }, function (err, baby) {
                  if (err) return res.status(500).send(err);
                  res.end();
               });
            }
         });
      } else if (req.body.babyAuth.level === 2) {
         User.findByIdAndUpdate(req.params.id, {
            $pull: {
               "contact": {
                  baby: req.body.babyAuth.id,
                  level: "level2"
               }
            }
         }, function (err, user) {
            if (err) return res.status(500).send(err);
            else {
               Baby.findByIdAndUpdate(req.body.babyAuth.id, {
                  $pull: {
                     "level2": req.params.id
                  }
               }, {
                  new: true
               }, function (err, baby) {
                  if (err) return res.status(500).send(err);
                  res.end();
               });
            }
         });
      }
   },

   createNurse: function (req, res) {
      var newUser = new User();
      newUser.roles.push("nurse");
      newUser.email = req.body.email;
      newUser.password = newUser.generateHash(req.body.password);
      newUser.nurse = {
         access: "nurse"
      };
      newUser.save(function (err, user) {
         if (err) return res.status(500).send(err);
         else {
            req.login(user, function (error) {
               res.send(user);
            });
         }
      });
   },

   getUser: function (req, res) {
      User.findById(req.params.userId)
         .populate('parent.baby')
         .exec(function (err, user) {
            if (err) return res.status(500).send(err);
            else res.send(user);
         });
   },

   editUser: function (req, res) {
      //returns the updated user document
      User.findByIdAndUpdate(req.params.userId, req.body, {
         new: true,
         upsert: true
      }, function (err, user) {
         if (err) return res.status(500).send(err);
         else res.send(user);
      });
   },

   getFeed: function (req, res) {
      console.log(req.params);
      if (req.params.level === 'level1') {
         console.log(155);
         Baby.findById(req.params.babyId)
            .populate("notes")
            .select("firstName middleName lastName gender birthWeight birthLength birthDate dischargeDate deathDate notes theme level1")
            .exec(function (err, baby) {
               if (err) return res.status(500).send(err);
               res.send(baby);
            });
      } else if (req.params.level === 'level2') {
         console.log(164);
         Baby.findById(req.params.babyId)
            .select("firstName middleName lastName gender birthWeight birthLength birthDate dischargeDate deathDate notes theme level1")
            .populate("notes", "picturesUrl comment")
            .exec(function (err, baby) {
               if (err) return res.status(500).send(err);
               res.send(baby);
            });
      }
   },

   changePassword: function (req, res) {
      User.findById(req.params.id, function (err, user) {
         if (err) return res.status(500).send(err);
         user.password = req.body.password;
         user.passwordHasBeenChanged = true;
         user.save(function (err, user) {
            if (err) return res.status(500).send(err);
            res.send(user);
         });
      });
   }
};
