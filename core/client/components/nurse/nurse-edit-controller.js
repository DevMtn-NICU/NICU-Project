(function () {
   "use strict";

   angular.module('app')
      .controller('editController', function ($scope, promised, makeBabySvc, $state) {

         $scope.showAdd = false;

         $scope.baby = promised;

         if(!$scope.baby.parents) {
             console.log(error);
         }
         else if ($scope.baby.parents.length > 0) {
             $scope.parent1 = {};
             $scope.parent2 = {};
             $scope.parent1.name = promised.parents[0].name;
             $scope.parent2.name = promised.parents[1].name;
             $scope.parent1.email = promised.parents[0].email;
             $scope.parent2.email = promised.parents[1].email;
         }
         $scope.baby.birthDate = new Date($scope.baby.birthDate);
         if ($scope.baby.dischargeDate) {
             $scope.baby.dischargeDate = new Date($scope.baby.dischargeDate);
         }
         if ($scope.baby.deathDate) {
             $scope.baby.deathDate = new Date($scope.baby.deathDate);
        }


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
      })
}());
