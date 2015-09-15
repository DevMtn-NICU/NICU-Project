(function () {
	"use strict";

	angular.module('app')
		.controller('nurseSearchCtrl', function ($scope, NurseService, getBabies) {

			$scope.babies = getBabies.data;

        })

} ());