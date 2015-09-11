var LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function (passport) {
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
    function(req, email, password, done) {
      User.findOne({'email': email}, function(err, user) {
        if (err) return done(err);
        if (!user) {
          return done(null, false);
        }
        if (!user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));
};
