var LocalStrategy = require('passport-local').Strategy,
   User = require('mongoose').model('User');

module.exports = function (passport) {
   passport.use('local', new LocalStrategy(
      //      {
      //         usernameField: 'email',
      //         passReqToCallback: true
      //      },
      function (email, password, done) {
         console.log('local.js: ', email, password, done);
         User.findOne({
            'email': email
         }, function (err, user) {
            if (err) return done(err);
            if (!user) {
               return done(null, false, {
                  message: 'Incorrect Username.'
               });
            }
            if (!user.validPassword(password)) {
               return done(null, false, {
                  message: 'Invalid Password'
               });
            }
            return done(null, user, {
               message: "you're in"
            });
         });
      }
   ));
};
