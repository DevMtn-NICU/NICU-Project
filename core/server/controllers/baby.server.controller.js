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
				console.log("14", parent1Id);
				newBaby.parents.push(parent1Id);
				deferred.resolve();
			} else {
				deferred.resolve();
			}
		});
		return deferred.promise;
	}()).then(function() {
		var deferred = Q.defer();
		User.findOne({email: req.body.parent2.email}, function(err, parent) {
			if (parent) {
				parent2Id = parent._id;
				console.log("27", parent2Id);
				newBaby.parents.push(parent2Id);
				deferred.resolve();
			} else {
				deferred.resolve();
			}
		});
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
			User.findByIdAndUpdate(parent1Id, {$push: {'parent.babies': babyId}}, function(err, parent) {
				if (err) return res.status(500).send(err);
				console.log("49", parent);
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
				console.log("63", parent1Id);
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
	Baby.find(req.query)
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
