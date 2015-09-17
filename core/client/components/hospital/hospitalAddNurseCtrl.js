(function () {
 "use strict";
 angular.module('app')
  .controller('hospitalAddNurseCtrl', function ($scope, hospitalSvc, $mdDialog) {
    $scope.showAdd = true;

    $scope.createNurse = function() {
      $scope.nurse.roles = ["nurse"];
      $scope.nurse.nurse = {
        access: ["nurse"]
      };
      hospitalSvc.createNurse($scope.nurse)
      .then(function(response) {
        $scope.nurse = {};
      });
    };
  });
}());
