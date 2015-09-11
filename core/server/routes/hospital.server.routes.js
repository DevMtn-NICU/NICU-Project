var hospitalsController = require('../controllers/hospital.server.controller.js');

module.exports = function (app) {
    app.route('/api/createHospital')
        .post(hospitalsController.createHospital);
        
    app.route('/api/hospitals')
        .get(hospitalsController.getHospitals);
		
	app.route('/api/hospitals:id')
		.get(hospitalsController.getHospital);

};