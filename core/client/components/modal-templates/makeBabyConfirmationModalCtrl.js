(function () {
  "use strict";
  angular.module('app').controller('makeBabyConfirmationModalCtrl', function ($scope, baby, $mdDialog, $state) {
    $scope.baby = baby;

    $scope.close = function(route) {
      $mdDialog.hide({});
    };
  });
} ());