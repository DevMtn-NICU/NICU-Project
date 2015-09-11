var babiesController = require('../controllers/baby.server.controller.js');

module.exports = function (app) {
    app.route('/api/makeBaby')
        .post(babiesController.makeBaby);
        
    app.route('/api/babies')
        .get(babiesController.getBabies);
		
	app.route('/api/babies:id')
		.get(babiesController.getBaby)

};