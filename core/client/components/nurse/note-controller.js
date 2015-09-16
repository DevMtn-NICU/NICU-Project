(function() {
  "use strict";

  angular.module('app')
    .controller('noteController', function($scope, promised, NurseService) {

      $scope.note = {};
      $scope.note.stats = {};
      $scope.theBaby = promised;

      $scope.addBabyNote = function() {
          console.log(promised._id);
          console.log(typeof promised._id);
        var details = {
          baby: promised._id,
          stats: {
            bloodPressure: $scope.note.stats.bloodPressure,
            heartRate: parseInt($scope.note.stats.heartRate),
            oxygen: parseInt($scope.note.stats.oxygen),
            weight: $scope.note.stats.weight
          },
          comment: $scope.note.comment
        }
        console.log("details: ", details);
        NurseService.addBabyNote(details).
        then(function(response) {})
      };
    })

}());
