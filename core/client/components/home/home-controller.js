(function () {
   "use strict";

   angular.module('app')
      .controller('homeController', function ($scope, $mdDialog) {
         $scope.test = "blah blah blah";

         $scope.userLogin = function() {
            console.log("doc body: ", angular.element(document.body));
            $mdDialog.show({
               templateUrl: 'components/modal-templates/user-login-modal.html',
               locals: {
                  test: $scope.test,
                  closeDialog: $scope.closeDialog
               },
               controller: 'homeController'
            });

         };
      
      $scope.closeDialog = function() {
            $mdDialog.hide({})
            alert($scope.username);
            alert($scope.password);
      };


      });
}());
