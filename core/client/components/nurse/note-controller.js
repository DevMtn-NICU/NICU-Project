(function() {
  "use strict";

  angular.module('app')
    .controller('noteController', function($scope, promised, NurseService) {

      $scope.notes = {};
      $scope.notes.stats = {};
      $scope.theBaby = promised;

      $scope.addBabyNote = function() {
        var details = {
          baby: promised._id,
          stats: {
            heartRate: $scope.note.stats.heartRate,
            oxygen: parseInt($scope.note.stats.oxygen)
          },
          comment: $scope.note.comment
        }
        NurseService.addBabyNote(details).
        then(function(response) {})
      };
    })

}());
