var babiesController = require('../controllers/baby.server.controller.js');

module.exports = function (app, passport) {
    app.route('/api/makeBaby')
      .post(
        // passport.authenticate('local'),
        babiesController.makeBaby);

    app.route('/api/babies')
      .get(
        //passport.authenticate('local'),
      babiesController.getBabies);

  	app.route('/api/babies/:id')
        .get(babiesController.getBaby);

    app.route('/api/babies/:id')
        .put(babiesController.editBaby);

    app.route('/api/babies/theme/:id')
        .put(babiesController.changeTheme);

    app.route('/api/babies/journal/:id')
        .post(babiesController.addJournal);
};
