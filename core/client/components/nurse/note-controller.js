(function() {
		"use strict";

		angular.module('app')
			.controller('noteController', function($scope, promised, NurseService) {

					$scope.notes = {};
					$scope.notes.stats = {};
					$scope.theBaby = promised;

					$scope.addBabyNote = function() {
                        var details = {
            				baby: $scope.theBaby._id,
                            stats: {heartRate: parseInt($scope.note.stats.heartRate),
									oxygen: parseInt($scope.note.stats.oxygen)},
                            comment: $scope.note.comment
            			}
						NurseService.addBabyNote(details).
						then(function(response) {
                            console.log(response);
                        })
					};
        })

}());
