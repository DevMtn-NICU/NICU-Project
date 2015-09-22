(function() {
	"use strict";

	angular.module('app')
		.controller('nurseController', function($scope, NurseService, $state) {
			$scope.logout = function() {
				NurseService.logout()
				.then(function() {
					$state.go('login');
				});
			};
    });
}());
