(function () {
 "use strict";

 angular.module('app')
  .controller('hospitalEditNurseCtrl', function ($scope, hospitalSvc, promised) {
    $scope.nurse = promised;
    $scope.showAdd = false;

    $scope.createNurse = function() {
      hospitalSvc.editStaff($scope.nurse)
      .then(function(response) {
        $scope.nurse = {};
      });
    };
  });
}());
