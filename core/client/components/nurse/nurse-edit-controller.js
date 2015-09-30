(function () {
   "use strict";

   angular.module('app')
      .controller('editController', function ($scope, promised, makeBabySvc, $state) {

         $scope.theme = "nurseViews";

         $scope.showAdd = false;

         $scope.baby = promised;

         $scope.parent1 = $scope.baby.parents[0];
         $scope.parent2 = $scope.baby.parents[1];

         $scope.baby.birthDate = new Date($scope.baby.birthDate);
         if ($scope.baby.dischargeDate) {
            $scope.baby.dischargeDate = new Date($scope.baby.dischargeDate);
         }
         if ($scope.baby.deathDate) {
            $scope.baby.deathDate = new Date($scope.baby.deathDate);
         }

         $scope.clearFields = function () {
            $scope.note = {};
            $state.go('medical.search');
         };

         $scope.makeBaby = function () {
            console.log('This is what we are sending: ', $scope.baby);
            makeBabySvc.editBaby($scope.baby, $scope.parent1, $scope.parent2)
               .then(function (response) {
                  //   $scope.baby = {};
                  //   $scope.parent1 = {};
                  //   $scope.parent2 = {};
                  $state.go('medical.search');
               });
         };
      });
}());
