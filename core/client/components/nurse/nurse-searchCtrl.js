(function () {
   "use strict";

   angular.module('app')
      .controller('nurseSearchCtrl', function ($scope, NurseService, getBabies) {

         $scope.theme = "nurseViews";

         $scope.babies = getBabies.data;
         for (var i = 0; i < $scope.babies.length; i++) {
            $scope.babies[i].birthDate = new Date($scope.babies[i].birthDate).toDateString();
         }

         $scope.customFilter = function (baby) {
            if (baby.dischargeDate || baby.deathDate) {
               return false;
            }
            return true;
         };
      });

}());
