(function() {
  "use strict";

  angular.module('app')
    .controller('noteController', function($scope, promised, NurseService) {

      $scope.notes = {};
      $scope.notes.stats = {};
      $scope.theBaby = promised;
      $scope.images = [];


      $scope.addBabyNote = function(imageId) {
          console.log(imageId);
        var details = {
          baby: promised._id,
          stats: {
            bloodPressure: $scope.note.stats.bloodPressure,
            heartRate: parseInt($scope.note.stats.heartRate),
            oxygen: parseInt($scope.note.stats.oxygen),
            weight: $scope.note.stats.weight
          },
          comment: $scope.note.comment,
          picturesUrl: imageId
        }
        console.log("details: ", details);
        NurseService.addBabyNote(details).
        then(function(response) {})
      };
    })


}());
