(function() {
		"use strict";

		angular.module('app')
			.controller('nurseController', function($scope, $stateParams) {

					$scope.notes = {};
					$scope.notes.stats = {};

					$scope.addBabyNote = function(note) {
						nurseService.addBabyNote(note).
						then(function(response) {

                        })
					};
        })

}());
