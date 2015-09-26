(function () {
   "use strict";

   angular.module('app')
      .controller('contactViewCtrl', function ($scope, $mdDialog, contactService, baby, $cookies, parentService) {
         $scope.babies = [];
         $scope.currentBaby = baby;
         if (!$cookies.getObject("userId")) {
            $state.go('login');
         }
         $scope.cookieBabies = $cookies.getObject("parentObj").babies;
         $scope.cookieBabies.concat($cookies.getObject("contactObj").babies);

         $scope.getBabyById = function (babyId) {
            parentService.getBabyById(babyId)
               .then(function (response) {
                  $scope.babies.push(response);
               });
         };

         for (var i = 0; i < $scope.cookieBabies.length; i++) {
            $scope.getBabyById($scope.cookieBabies[i]);
         }

         $scope.$watch('currentBaby', function () {
            $scope.$broadcast('babyChanged');
         });

         $scope.$on('babyChanged', function (e) {
            if ($scope.currentBaby) {
               parentService.setBabyId($scope.currentBaby._id);
               parentService.getBabyById($scope.currentBaby._id)
                  .then(function (response) {
                     $scope.theme = response.theme;
                  });
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
      });

}());
