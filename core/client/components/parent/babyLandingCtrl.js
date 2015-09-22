(function () {
   "use strict";

   angular.module('app')
      .controller('babyLanding',
         function ($scope, parentService, $mdDialog, $stateParams, $cookies, $rootScope) {
            $scope.baby = {};

            function getCurrentBaby() {
               var babyId = parentService.sendBabyId();
               if (babyId) {
                  parentService.getBabyById(babyId)
                     .then(function (baby) {
                        $scope.baby = baby;
                        $scope.notes = baby.notes;
                     })
                  return $scope.baby, $scope.notes;
               }
               console.log('getCurrentBaby failed');
            }
            getCurrentBaby();
            //watches for dropdown in parent scope to change
            $scope.$on('babyChanged', function (e) {
               if ($scope.$parent.currentBaby) {
                  $scope.baby = $scope.$parent.currentBaby;
                  $scope.getBaby($scope.baby._id);

                  $cookies.putObject("babyId", $scope.baby._id);
               }
            });


            $scope.getBaby = function (babyId) {
               parentService.getBabyById(babyId)
                  .then(function (baby) {
                     $scope.baby = baby;
                     $scope.notes = baby.notes;
                  });
            };


         });
}());
