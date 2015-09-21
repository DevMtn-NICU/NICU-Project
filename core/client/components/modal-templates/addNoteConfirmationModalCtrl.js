(function () {
  "use strict";
  angular.module('app').controller('addNoteConfirmationModalCtrl', function ($scope, note, theBaby, $mdDialog, $state, NurseService) {
    $scope.theBaby = theBaby;
    $scope.note = note;

    $scope.hideModal = function() {
        $mdDialog.hide();
    }

    $scope.close = function(route) {
      $mdDialog.hide({});
      $state.go('medical.search');
    };

    // submitting from modal
    $scope.addBabyNote = function () {
      $scope.note.baby = $scope.theBaby._id;
      $scope.note.stats.heartRate = parseInt($scope.note.stats.heartRate);
      $scope.note.stats.oxygen = parseInt($scope.note.stats.oxygen);
      $scope.note.picturesUrl = $scope.imageId;
      var note = $scope.note;
      NurseService.addBabyNote(note).
        then(function (response) {

        })

    };



  });
} ());
