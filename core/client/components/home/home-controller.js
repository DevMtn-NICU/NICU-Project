(function () {
   "use strict";

   angular.module('app')
      .controller('homeController', function ($scope, $mdDialog, LoginService) {

         $scope.userLogin = function() {
            $mdDialog.show({
               templateUrl: 'components/modal-templates/user-login-modal.html',
               locals: {
                  closeDialog: $scope.closeDialog
               },
               controller: 'homeController'
            });

         };
      $scope.login = {};
      $scope.closeDialog = function() {
            $mdDialog.hide({})
            console.log($scope.login);
            LoginService.validateLogin($scope.login);
      };


      });
}());
