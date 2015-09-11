//controller for generating and obtaining baby data
var Baby = require("../models/baby.server.model.js");

exports.makeBaby = function (req, res) {
	var newBaby = new Baby(req.body);
	newBaby.save(function (err, result) {
		if (err) {
			return res.status(501).send(err);
		}
		res.send(result);
	});
};

exports.getBabies = function (req, res) {
	Baby.find(req.query)
	.populate('nurses')
	.populate('parents')
	.exec(function(err, result) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log(result);
		res.send(result);
	});
};

exports.getBaby = function (req, res) {
	Baby.find(req.query)
	.populate('nurses')
	.populate('parents')
	.populate('notes')
	.populate('level1')
	.populate('level2')
	.populate('level3')
	.exec(function(err, result) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log(result);
		res.send(result);
	});
};
