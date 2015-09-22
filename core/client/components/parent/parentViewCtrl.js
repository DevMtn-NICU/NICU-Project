(function () {

   "use strict";


   angular.module('app').controller('parentViewCtrl', function ($scope, parentService, $stateParams, $state, $cookies) {
      $scope.babies = [];
      $scope.cookieBabies = $cookies.getObject("parentObj").babies;
      $scope.cookieBabies.concat($cookies.getObject("contactObj").babies);
      $scope.theme = "";

      $scope.getBabyById = function (babyId) {
         parentService.getBabyById($scope.cookieBabies[i])
            .then(function (response) {
               $scope.babies.push(response);
               $scope.currentBaby = $scope.babies[0];
            });
      };

      for (var i = 0; i < $scope.cookieBabies.length; i++) {
         $scope.getBabyById($scope.cookieBabies[i]);
      }


      $scope.$watch('currentBaby', function () {
         $scope.$broadcast('babyChanged');
      });

      $scope.$on('babyChanged', function (e) {
         console.log('babychanged $scope', $scope.currentBaby._id);
         parentService.setBabyId($scope.currentBaby._id);
      });

   });


}());
