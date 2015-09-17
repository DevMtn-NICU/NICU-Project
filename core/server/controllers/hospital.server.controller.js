//Controller for Hospital management
var Hospital = require("../models/hospital.server.model.js");
var User = require('../models/user.server.model.js');

exports.createHospital = function (req, res) {
   var newHospital = new Hospital(req.body);
   newHospital.save(function (err, result) {
      if (err) {
         res.status(501).send(err);
      }
      res.send(result);
   });
};

exports.getHospitals = function (req, res) {
   Hospital.find(req.query)
      .populate('nurses')
      .populate('users')
      .exec(function (err, result) {
         if (err) {
            res.status(500).send(err);
         }
         console.log(result);
         res.send(result);
      });
};

exports.getHospital = function (req, res) {
   Hospital.find(req.query)
      .populate('nurses')
      .populate('users')
      .exec(function (err, result) {
         if (err) {
            res.status(500).send(err);
         }
         console.log(result);
         res.send(result);
      });
   Hospital.find(req.query)
      .populate('nurses')
      .populate('users')
      .exec(function (err, result) {
         if (err) {
            res.status(500).send(err);
         }
         console.log(result);
         res.send(result);
      });
};

exports.getAllStaff = function (req, res) {
   User.find({
         'roles': 'nurse'
      })
      .exec(function (err, nurses) {
         if (err) return res.status(500).send(err);
         res.send(nurses);
      });
};

exports.createStaff = function (req, res) {
   var newNurse = new User(req.body)
      .save(function (err, nurse) {
         if (err) return res.status(500).send(err);
         res.send(nurse);
      });
};

exports.getOneStaff = function (req, res) {
   User.findById(req.params.id, function (err, nurse) {
      if (err) return res.status(500).send(err);
      res.send(nurse);
   });
};

exports.editStaff = function (req, res) {
   User.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true
   }, function (err, nurse) {
      if (err) return res.status(500).send(err);
      console.log(nurse);
      console.log(req.body);
      console.log('update was successful');
      return res.send(nurse);
   });
};

exports.editPassword = function (req, res) {
   User.findById(req.params.id, function (err, nurse) {
      if (err) return res.status(500).send(err);
      nurse.password = req.body.password;
      nurse.save(function (err) {
         if (err) console.log('error');
         console.log(nurse);
         res.status(200).send('success');
      });
   })
};

exports.deleteStaff = function (req, res) {
   User.findByIdAndRemove(req.params.id, function (err, nurse) {
      if (err) return res.status(500).send(err);
      res.end();
   });
};
