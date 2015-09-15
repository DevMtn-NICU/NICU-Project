//controller for generating and obtaining baby data
var Baby = require("../models/baby.server.model.js");
var User = require("../models/user.server.model.js");

exports.makeBaby = function (req, res) {
	var babyId, parent1Id, parent2Id;
	var newBaby = new Baby(req.body.baby);
	User.findOne({email: req.body.parent1.email}, function(err, parent) {
		if (parent) {
			parent1Id = parent._id;
			newBaby.parents.push(parent1Id);
		}
	});
	if (req.body.parent2) {
		User.findOne({email: req.body.parent2.email}, function(err, parent) {
			parent2Id = parent._id;
			newBaby.parents.push(parent2Id);
		});
	}
	newBaby.save(function (err, result) {
		if (err) {
			return res.status(501).send(err);
		}
		babyId = result._id;
	}).then(function() {
		if(parent1Id) {
			User.findByIdAndUpdate(parent1Id, {$push: {'parent': {'babies': {baby: babyId}}}}, function(err){
				if (err) res.status(501).send(err);
			}).then(function() {
				if(parent2Id) {
					User.findByIdAndUpdate(parent2Id, {$push: {'parent': {'babies': {baby: babyId}}}}, function(err){
						if (err) res.status(501).send(err);
					});
				}
			});
		}
		var newParent1 = new User(req.body.parent1);
		newParent1.roles.push("parent");
		newParent1.password = "test";
		newParent1.parent.access = "parent";
		newParent1.parent.babies.push({baby: babyId});
		newParent1.save(function(err, result) {
			if (err) return res.status(501).send(err);
			parent1Id = result._id;
		}).then(function() {
			if(req.body.parent2) {
				var newParent2 = new User(req.body.parent2);
				newParent2.roles.push("parent");
				newParent2.parent.access = "parent";
				newParent2.parent.babies.push({baby: babyId});
				newParent2.password = "test";
				newParent2.save(function(err, result) {
					if (err) return res.status(501).send(err);
					parent2Id = result._id;
				}).then(function() {
					Baby.findByIdAndUpdate(babyId, {$push: {'parents': {parent: parent2Id}}}, {new: true}, function(err, result) {
						if (err) return res.status(501).send(err);
					});
				});
			}
		}).then(function() {
			Baby.findByIdAndUpdate(babyId, {$push: {'parents': {parent: parent1Id}}}, {new: true}, function(err, result) {
				if (err) return res.status(501).send(err);
				res.send(result);
			});
		});
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
