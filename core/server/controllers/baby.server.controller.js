//controller for generating and obtaining baby data
var Baby = require("../models/baby.server.model.js");
var User = require("../models/user.server.model.js");
var Q = require('q');

exports.makeBaby = function (req, res) {
	var babyId, parent1Id, parent2Id;
	var newBaby = new Baby(req.body.baby);
	(function findParent() {
		var deferred = Q.defer();
		User.findOne({email: req.body.parent1.email}, function(err, parent) {
			if (parent) {
				parent1Id = parent._id;
				newBaby.parents.push(parent1Id);
				deferred.resolve();
			} else {
				deferred.resolve();
			}
		});
		return deferred.promise;
	}()).then(function() {
		var deferred = Q.defer();
		if(req.body.parent2) {
			User.findOne({email: req.body.parent2.email}, function(err, parent) {
				if (parent) {
					parent2Id = parent._id;
					newBaby.parents.push(parent2Id);
					deferred.resolve();
				} else {
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
			deferred.resolve();
		});
		return deferred.promise;
	}).then(function() {
		var deferred = Q.defer();
		if (parent1Id) {
			User.findByIdAndUpdate(parent1Id, {$push: {'parent.babies': babyId}}, function(err, parent) {
				if (err) return res.status(500).send(err);
				deferred.resolve();
			});
		} else {
			var newParent1 = new User();
			newParent1.roles.push("parent");
			newParent1.name = req.body.parent1.name;
			newParent1.email = req.body.parent1.email;
			newParent1.password = "test";
			newParent1.parent.access = "parent";
			newParent1.parent.babies.push(babyId);
			newParent1.save(function(err, parent) {
				if (err) return res.status(500).send(err);
				parent1Id = parent._id;
				Baby.findByIdAndUpdate(babyId, {$push: {'parents': parent1Id}}, function(err, baby) {
					if (err) return res.status(500).send(err);
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
					Baby.findByIdAndUpdate(babyId, {$push: {'parents': parent2Id}}, function(err, baby) {
						if (err) res.status(500).send(err);
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
		res.send(result);
	});
};

exports.editBaby = function(req, res) {
	console.log(req.body.parent2);
	var baby, babyUpdated;
	(function findBaby() {
		var deferred = Q.defer();
		Baby.findById(req.body.baby._id)
		.populate('parents')
		.exec(function(err, response) {
			if (err) return res.status(500).send(err);
			baby = response;
			deferred.resolve();
		});
		return deferred.promise;
	}()).then(function() {
		var deferred = Q.defer();
		if (baby.parents[0].email === req.body.parent1.email && baby.parents[0].name === req.body.parent1.name) {
			if (baby.parents[1].email === req.body.parent2.email && baby.parents[1].name === req.body.parent2.name) {
				//Both parents match db, only baby changed
				Baby.findByIdAndUpdate(baby._id, req.body.baby, {new: true}, function(err, newBaby) {
					if (err) return res.status(500).send(err);
					res.send(newBaby);
					babyUpdated = true;
					deferred.resolve();
				});
			} else {
				deferred.resolve();
			}
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}).then(function() {
		//Parent1 Stuff
		var deferred = Q.defer();
		if (baby.parents[0].email === req.body.parent1.email && baby.parents[0].name === req.body.parent1.name) {
			deferred.resolve();
		} else {
			if (!req.body.parent1.email && !req.body.parent1.name) {
				//Parent1 is deleted
				(function babyUpdate() {
					var deferred2 = Q.defer();
					Baby.findByIdAndUpdate(baby._id, {$pull: {'parents': baby.parents[0]}}, {new: true}, function(err, result) {
						if (err) return res.status(500).send(err);
						deferred2.resolve();
					});
					return deferred2.promise;
				}()).then(function() {
					var deferred2 = Q.defer();
					User.findByIdAndUpdate(baby.parents[0]._id, {$pull: {'parent.babies': {_id: baby._id}}}, {new: true}, function(err, result) {
						if (err) return res.status(500).send(err);
						deferred2.resolve();
					});
				}).then(function() {
					deferred.resolve();
				});
			} else {
				//Parent1 Changed
				User.findByIdAndUpdate(baby.parents[0]._id, req.body.parent1, {new: true}, function(err, result) {
					if (err) return res.status(500).send(err);
					deferred.resolve();
				});
			}
		}
		return deferred.promise;
	}).then(function() {
		//Parent2 Stuff
		var deferred = Q.defer();
		if (baby.parents[1].email === req.body.parent2.email && baby.parents[1].name === req.body.parent2.name) {
			deferred.resolve();
		} else {
			if (req.body.parent2.email === "" && req.body.parent2.name === "") {
				//Parent2 is deleted
				(function babyUpdate() {
					var deferred2 = Q.defer();
					console.log("224");
					Baby.findByIdAndUpdate(baby._id, {$pull: {'parents': baby.parents[1]}}, {new: true}, function(err, result) {
						if (err) return res.status(500).send(err);
						deferred2.resolve();
					});
					return deferred2.promise;
				}()).then(function() {
					var deferred2 = Q.defer();
					User.findByIdAndUpdate(baby.parents[1]._id, {$pull: {'parent.babies': {_id: baby._id}}}, {new: true}, function(err, result) {
						if (err) return res.status(500).send(err);
						deferred2.resolve();
					});
				}).then(function() {
					deferred.resolve();
				});
			} else {
				//Parent2 Changed
				User.findByIdAndUpdate(baby.parents[1]._id, req.body.parent2, {new: true}, function(err, result) {
					if (err) return res.status(500).send(err);
					deferred.resolve();
				});
			}
		}
		return deferred.promise;
	}).then(function() {
		//Update and return Baby
		if(!babyUpdated) {
			Baby.findByIdAndUpdate(baby._id, req.body.baby, {new: true}, function(err, result) {
				if (err) return res.status(500).send(err);
				res.send(result);
			});
		}
	});
};
