var hospitalsController = require('../controllers/hospital.server.controller.js');

module.exports = function (app) {
    app.route('/api/createHospital')
        .post(hospitalsController.createHospital);

    app.route('/api/hospitals')
        .get(hospitalsController.getHospitals);

	app.route('/api/hospitals:id')
		.get(hospitalsController.getHospital);

  app.route('/api/staff')
    .get(hospitalsController.getAllStaff);

  app.route('/api/staff')
    .post(hospitalsController.createStaff);

  app.route('/api/staff/:id')
    .get(hospitalsController.getOneStaff);

  app.route('/api/staff/:id')
    .put(hospitalsController.editStaff);

  app.route('/api/staff/:id')
    .delete(hospitalsController.deleteStaff);
};
