(function () {
	"use strict";

	angular.module('app')
		.service('parentService', function ($http, $q) {

			this.addBabyNote = function (note) {  //this is a repeat from the nurse service, we might want to refactor
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

			this.getBabyById = function(id) {  //this is a repeat from the nurse service, we might want to refactor
				console.log("id: ", id);
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: '/api/babies/' + id,
				}).then(function(response) {
					console.log("response: ", response.data);
					var results = response.data;
					deferred.resolve(results);
				});
				return deferred.promise;
			}

	});
} ());