(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService) {

      $scope.note = {};
      $scope.note.stats = {};
      $scope.theBaby = promised;

      $scope.addBabyNote = function () {
        // console.log(promised._id);
        // console.log(typeof promised._id);
        $scope.note.baby = promised._id;
        console.log("Notes: ", $scope.note);
        NurseService.addBabyNote($scope.note).
          then(function (response) { })
      };
    })

} ());
