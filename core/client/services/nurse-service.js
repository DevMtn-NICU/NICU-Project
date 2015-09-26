(function () {
	"use strict";

	angular.module('app')
		.service('NurseService', function ($http, $q, $cookies) {

			this.addBabyNote = function (note) {
				var userId = $cookies.getObject("userId");
				note.creator = userId;
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
				});
			};

			this.getBabyById = function(id) {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: '/api/babies/' + id,
				}).then(function(response) {
					var results = response.data;
					deferred.resolve(results);
				});
				return deferred.promise;
			};

			this.logout = function() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: '/logout'
				}).then(function() {
					$cookies.remove("userId");
					$cookies.remove("userName");
					$cookies.remove("userRoles");
					$cookies.remove("userEmail");
					$cookies.remove("parentObj");
					$cookies.remove("contactObj");
					$cookies.remove("nurseObj");
					$cookies.remove("pwdChanged");
					deferred.resolve();
				});
				return deferred.promise;
			};

	});
} ());
