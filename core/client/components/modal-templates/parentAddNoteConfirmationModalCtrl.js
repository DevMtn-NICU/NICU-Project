(function () {
  "use strict";
  angular.module('app').controller('parentAddNoteConfirmationModalCtrl', function ($scope, baby, theBaby, $mdDialog, $state) {
    $scope.baby = baby;
    $scope.theBaby = theBaby;

    $scope.hideModal = function() {
        $mdDialog.hide();
    }

    $scope.close = function(route) {
      $mdDialog.hide({});
    };
  });
} ());