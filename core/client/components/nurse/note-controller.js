(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService) {

      $scope.note = {};
      $scope.note.stats = {};
      $scope.theBaby = promised;
      $scope.images = [];

      $scope.addBabyNote = function () {
        // console.log(promised._id);
        // console.log(typeof promised._id);
        $scope.note.baby = promised._id;
        $scope.note.stats.heartRate = parseInt($scope.note.stats.heartRate);
        $scope.note.stats.oxygen = parseInt($scope.note.stats.oxygen);
        $scope.note.picturesUrl = $scope.imageId;
        console.log("Notes: ", $scope.note);
        NurseService.addBabyNote($scope.note).
          then(function (response) { })
      };
    })

} ());

