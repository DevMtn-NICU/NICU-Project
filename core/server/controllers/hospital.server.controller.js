//Controller for Hospital management
var Hospital = require("../models/hospital.server.model.js")

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
	.exec(function(err, result) {
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
	.exec(function(err, result) {
		if (err) {
			res.status(500).send(err);
		}
		console.log(result);
		res.send(result);
	});
};