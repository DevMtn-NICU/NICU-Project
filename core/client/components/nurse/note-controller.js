(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService, $mdDialog) {

      $scope.note = {};
      $scope.note.stats = {};
      $scope.theBaby = promised;
      $scope.images = [];

      $scope.addBabyNote = function () {
        $scope.note.baby = promised._id;
        $scope.note.stats.heartRate = parseInt($scope.note.stats.heartRate);
        $scope.note.stats.oxygen = parseInt($scope.note.stats.oxygen);
        $scope.note.picturesUrl = $scope.imageId;
        NurseService.addBabyNote($scope.note).
          then(function (response) {
              $mdDialog.show({
                templateUrl: "./components/modal-templates/addNoteConfirmationModal.html",
                locals: {
                  baby: response,
                  theBaby: $scope.theBaby
                },
                controller: "addNoteConfirmationModalCtrl",
              });
          })

      };

      $scope.clearFields = function() {
          $scope.note = {};
      }

    })

} ());
