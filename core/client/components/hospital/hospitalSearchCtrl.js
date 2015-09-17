(function () {
 "use strict";

 angular.module('app')
  .controller('hospitalSearchCtrl', function ($scope, hospitalSvc) {
    $scope.getStaff = function() {
      hospitalSvc.getStaff().then(function(response) {
        $scope.staff = response;
      });
    };

    $scope.getStaff();

    $scope.removeStaff = function(id) {
      hospitalSvc.removeStaff(id)
      .then(function(response) {
        $scope.getStaff();
      });
    };
  });
}());
