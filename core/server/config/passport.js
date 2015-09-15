var passport = require('passport'),
   LocalStrategy = require('passport-local').Strategy,
   mongoose = require('mongoose');

module.exports = function (passport) {
   var User = mongoose.model('User');

   passport.serializeUser(function (user, done) {
      done(null, user.id);
   });

   passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
         done(err, user);
      });
   });

   require('./strategies/local.js')(passport);
};
