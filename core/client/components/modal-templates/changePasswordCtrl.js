(function () {
  "use strict";
  angular.module('app').controller('changePasswordCtrl', function ($scope, $mdDialog, parentService, theme, $cookies) {
    $scope.passwordsDontMatch = false;
    $scope.success = false;
    $scope.theme = theme;

    $scope.close = function() {
      $mdDialog.hide();
    };

    $scope.changePassword = function() {
      if($scope.newPassword !== $scope.verifyPassword) {
        $scope.passwordsDontMatch = true;
        $scope.newPassword = "";
        $scope.verifyPassword = "";
      } else {
        parentService.changePassword($scope.newPassword)
        .then(function(user) {
          $scope.success = true;
          $scope.passwordsDontMatch = false;
          $scope.newPassword = "";
          $scope.verifyPassword = "";
          $cookies.putObject("pwdChanged", true);
        });
      }
    };
  });
} ());
