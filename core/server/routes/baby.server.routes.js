var babiesController = require('../controllers/baby.server.controller.js');

module.exports = function (app, passport) {
    app.route('/api/makeBaby')
      .post(
        // passport.authenticate('local'),
        babiesController.makeBaby);

    app.route('/api/babies')
      .get(passport.authenticate('local'), babiesController.getBabies);

  	app.route('/api/babies/:id')
        .get(babiesController.getBaby);
};
