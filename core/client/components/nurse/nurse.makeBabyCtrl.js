(function () {
  "use strict";
  angular.module('app').controller('makeBabyCtrl', function ($scope, makeBabySvc) {
      $scope.showAdd = true;
    $scope.makeBaby = function() {
      makeBabySvc.makeBaby($scope.baby, $scope.parent1, $scope.parent2)
      .then(function(response) {
        $scope.baby = {};
        $scope.parent1 = {};
        $scope.parent2 = {};
      });
    };
  });
} ());
