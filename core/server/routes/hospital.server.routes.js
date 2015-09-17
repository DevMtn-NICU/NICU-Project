var hospitalsController = require('../controllers/hospital.server.controller.js');

module.exports = function (app) {
   app.route('/api/createHospital')
      .post(hospitalsController.createHospital);

   app.route('/api/hospitals')
      .get(hospitalsController.getHospitals);

   app.route('/api/hospitals:id')
      .get(hospitalsController.getHospital);
   //get all staff
   app.route('/api/staff')
      .get(hospitalsController.getAllStaff);
   //create nurse
   app.route('/api/staff')
      .post(hospitalsController.createStaff);
   //get one nurse
   app.route('/api/staff/:id')
      .get(hospitalsController.getOneStaff);
   //edit nurse
   app.route('/api/staff/:id')
      .post(hospitalsController.editStaff);
   //edit nurse password
   app.route('/api/staff/password-change/:id')
      .post(hospitalsController.editPassword);
   //delete nurse
   app.route('/api/staff/:id')
      .delete(hospitalsController.deleteStaff);
};
