//controller for generating and obtaining baby data
var Baby = require("../models/baby.server.model.js");
var User = require("../models/user.server.model.js");
var Q = require('q');

exports.makeBaby = function (req, res) {
	console.log(req.body);
	var babyId, parent1Id, parent2Id;
	var newBaby = new Baby(req.body.baby);
	(function findParent() {
		var deferred = Q.defer();
		User.findOne({email: req.body.parent1.email}, function(err, parent) {
			if (parent) {
				parent1Id = parent._id;
				console.log("14", parent1Id);
				newBaby.parents.push(parent1Id);
				deferred.resolve();
			} else {
				console.log("19");
				deferred.resolve();
			}
		});
		return deferred.promise;
	}()).then(function() {
		console.log("25");
		var deferred = Q.defer();
		if(req.body.parent2) {
			User.findOne({email: req.body.parent2.email}, function(err, parent) {
				if (parent) {
					parent2Id = parent._id;
					console.log("27", parent2Id);
					newBaby.parents.push(parent2Id);
					deferred.resolve();
				} else {
					console.log("33");
					deferred.resolve();
				}
			});
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}).then(function() {
		var deferred = Q.defer();
		newBaby.save(function(err, baby) {
			if (err) return res.status(500).send(err);
			babyId = baby._id;
			console.log("40", babyId);
			deferred.resolve();
		});
		return deferred.promise;
	}).then(function() {
		var deferred = Q.defer();
		if (parent1Id) {
			console.log("47");
			User.findByIdAndUpdate(parent1Id, {$push: {'parent.babies': babyId}}, function(err, parent) {
				if (err) return res.status(500).send(err);
				console.log("49", parent);
				deferred.resolve();
			});
		} else {
			console.log("54");
			var newParent1 = new User();
			newParent1.roles.push("parent");
			newParent1.name = req.body.parent1.name;
			newParent1.email = req.body.parent1.email;
			newParent1.password = "test";
			newParent1.parent.access = "parent";
			newParent1.parent.babies.push(babyId);
			console.log("60", newParent1);
			newParent1.save(function(err, parent) {
				if (err) return res.status(500).send(err);
				parent1Id = parent._id;
				console.log("6	3", parent1Id);
				Baby.findByIdAndUpdate(babyId, {$push: {'parents': parent1Id}}, function(err, baby) {
					if (err) return res.status(500).send(err);
					console.log("66", baby);
					deferred.resolve();
				});
			});
		}
		return deferred.promise;
	}).then(function() {
		var deferred = Q.defer();
		if (parent2Id) {
			User.findByIdAndUpdate(parent2Id, {$push: {'parent.babies': babyId}}, function(err, parent) {
				if (err) return res.status(500).send(err);
				console.log("77", parent);
				deferred.resolve();
			});
		} else {
			if(req.body.parent2) {
				var newParent2 = new User();
				newParent2.roles.push("parent");
				newParent2.name = req.body.parent2.name;
				newParent2.email = req.body.parent2.email;
				newParent2.password = "test";
				newParent2.parent.access = "parent";
				newParent2.parent.babies.push(babyId);
				newParent2.save(function(err, parent) {
					if (err) return res.status(500).send(err);
					parent2Id = parent._id;
					console.log("91", parent2Id);
					Baby.findByIdAndUpdate(babyId, {$push: {'parents': parent2Id}}, function(err, baby) {
						if (err) res.status(500).send(err);
						console.log("94", baby);
						deferred.resolve();
					});
				});
			} else {
				deferred.resolve();
			}
		}
		return deferred.promise;
	}).then(function() {
		Baby.findById(babyId, function(err, baby) {
			if (err) return res.status(500).send(err);
			console.log("103", baby);
			res.send(baby);
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
	console.log('This is the baby id: ', req.params.id);
	Baby.findById(req.params.id)
	.populate('parents')
	.populate('notes')
	.populate('level1.user')
	.populate('level2.user')
	.populate('level3.user')
	.exec(function(err, result) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log(result);
		res.send(result);
	});
};

exports.editBaby = function(req, res) {
	var parent1, parent2, baby;
	(function findBaby() {
		var deferred = Q.defer();
		Baby.findById(req.body.baby._id)
		.populate('parents')
		.exec(function(err, response) {
			if (err) return res.status(500).send(err);
			baby = response;
			deferred.resolve();
		});
	}()).then(function() {
		var deferred = Q.defer();
		if (baby.parents[0] === req.body.parent1) {
			if (baby.parents[1] === req.body.parent2) {
				Baby.findByIdAndUpdate(baby._id, req.body.baby, {new: true}, function(err, newBaby) {
					if (err) return res.status(500).send(err);
					res.send(newBaby);
					deferred.resolve();
				});
			}
		} else {
			var updateParent1 = function() {
				var deferredness = Q.defer();
				if (!req.body.parent1.email && !req.body.parent1.name) {
					baby.parents.pull(baby.parents[0]);
					User.findByIdAndUpdate(baby.parents[0]._id, {$pull: {'parent.babies': {_id: baby._id}}}, {new: true}, function(err, result) {
						if (err) return res.status(500).send(err);
						deferredness.resolve();
					});
				} else {
					User.findByIdAndUpdate(baby.parents[0]._id, req.body.parent1, {new: true}, function(err, result) {
						if (err) return res.status(500).send(err);
						parent1 = result;
						deferredness.resolve();
					});
				}
			};
			if (baby) {

			}
		}
	});
};

var updateParent2 = function() {
	if (!req.body.parent2.email && !req.body.parent2.name) {
		baby.parents.pull(baby.parents[1]);
		User.findByIdAndUpdate(baby.parents[1]._id, {$pull: {'parent.babies': {_id: baby._id}}}, {new: true}, function(err, result) {
			if (err) return res.status(500).send(err);
		});
	} else {
		User.findByIdAndUpdate(baby.parents[1]._id, req.body.parent2, {new: true}, function(err, result) {
			if (err) return res.status(500).send(err);
			parent2 = result;
		});
	}
};
