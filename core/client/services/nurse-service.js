(function () {
	"use strict";

	angular.module('app')
		.service('NurseService', function ($http, $q) {

			this.addBabyNote = function (note) {
				var deferred = $q.defer();
				$http({
					method: 'POST',
					url: '/babyNote',
					data: note
				}).then(function (response) {
					var results = response.data;
					deferred.resolve(results);
				});
				return deferred.promise;
			};

			this.getBabies = function () {
				return $http.get("/api/babies").error(function (err) {
					return err;
				})
			};



		this.getBabyById = function(id) {
			console.log(id);
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: '/api/babies/?_id =' + id,
			}).then(function(response) {
				var results = response.data;
				deferred.resolve(results);
			});
			return deferred.promise;
		}

	});
} ());
