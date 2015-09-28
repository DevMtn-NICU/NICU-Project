(function () {
   "use strict";

   angular.module('app')
      .controller('contactViewCtrl', function ($scope, $mdDialog, contactService, baby, $cookies, $mdSidenav, parentService, $state) {
         $scope.babies = [];
         $scope.currentBaby = baby;
         if (!$cookies.getObject("userId")) {
            $state.go('login');
         }
         $scope.cookieBabies = $cookies.getObject("contactObj");

         $scope.getBabyById = function (babyId, level) {
            contactService.getFeed(babyId, level)
               .then(function (response) {
                  $scope.babies.push(response);
               });
         };

         for (var i = 0; i < $scope.cookieBabies.length; i++) {
            $scope.getBabyById($scope.cookieBabies[i].baby, $scope.cookieBabies[i].level);
         }


         $scope.$watch('currentBaby', function () {
            $scope.$broadcast('babyChanged');
         });

         $scope.$on('babyChanged', function (e) {
           $scope.theme = $scope.currentBaby.theme;
           if($scope.currentBaby.level1.indexOf($cookies.getObject("userId")) !== -1) {
             $scope.level1 = true;
           } else {
             $scope.level1 = false;
           }
         });

         if ($scope.currentBaby) {
            $scope.theme = $scope.currentBaby.theme || 'Neutral';
         }

         $scope.logout = function () {
            parentService.logout()
               .then(function () {
                  $state.go('login');
               });
         };


         $scope.openPasswordModal = function () {
            $mdDialog.show({
               templateUrl: "./components/modal-templates/changePasswordModal.html",
               controller: "changePasswordCtrl",
               locals: {
                  theme: $scope.theme
               }
            });
         };

         $scope.toggleSidenav = function() {
           $mdSidenav('menu').toggle();
         };
      });

}());
