(function () {
   "use strict";

   angular.module('app')
      .controller('homeController', function ($scope, $mdDialog, LoginService) {

         $scope.theme = "nurseViews";

         $scope.userLogin = function (ev) {
            $mdDialog.show({
               templateUrl: 'components/modal-templates/user-login-modal.html',
               locals: {
                  closeDialog: $scope.closeDialog
               },
               controller: 'homeController',
               targetEvent: ev,
               clickOutsideToClose: true
            });

         };
         $scope.login = {};
         $scope.submitDialog = function () {
            $mdDialog.hide({})
            LoginService.validateLogin($scope.login).then(function (res) {
               if (res) {
                  $mdDialog.hide();
                  $mdDialog.show({
                     templateUrl: 'components/modal-templates/user-login-modal.html',
                     locals: {
                        closeDialog: $scope.closeDialog
                     },
                     controller: 'homeController',
                     clickOutsideToClose: true
                  });
               }
            })




         };
         $scope.closeDialog = function () {
            // Easily hides most recent dialog shown...
            // no specific instance reference is needed.
            $mdDialog.hide();
         };
      });
}());


//$scope.showAdvanced = function(ev) {
//    $mdDialog.show({
//      controller: DialogController,
//      templateUrl: 'dialog1.tmpl.html',
//      parent: angular.element(document.body),
//      targetEvent: ev,
//      clickOutsideToClose:true
//    })
