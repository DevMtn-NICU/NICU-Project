var LocalStrategy = require('passport-local').Strategy,
   User = require('mongoose').model('User');

module.exports = function (passport) {
   passport.use('local', new LocalStrategy(
      //      {
      //         usernameField: 'email',
      //         passReqToCallback: true
      //      },
      function (email, password, done) {
         console.log('local.js: ', done);
         User.findOne({
            'email': email
         }, function (err, user) {
            if (err) return done(err);
            if (!user) {
               console.log('bad username');
               return done(null, false, {
                  
                  message: 'Incorrect Username.'
               });
            }
            if (!user.validPassword(password)) {
               
                  console.log('bad password');
               return done(null, false, {
                  message: 'Invalid Password'
               });
            }
            
            console.log('you\'re in');
            return done(null, user, {
               message: "you're in"
            });
         });
      }
   ));
};
