(function () {
   "use strict";

   angular.module('app')
      .controller('babyLanding',
         function ($scope, parentService, $mdDialog, $stateParams, $cookies, $rootScope) {
           $scope.baby = {};
           $scope.$on('babyChanged', function(e) {
             if ($scope.$parent.currentBaby) {
               $scope.baby = $scope.$parent.currentBaby;
               console.log($scope.baby);
               $scope.getBaby($scope.baby._id);
             }
           });

           $scope.note = {};
           $scope.getBaby = function(babyId) {
             parentService.getBabyById(babyId)
              .then(function (baby) {
                  $scope.baby = baby;
                  $scope.note = baby.notes[0];
              });
            };
         });
}());
