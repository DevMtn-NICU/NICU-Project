(function () {
   "use strict";

   angular.module('app')
      .controller('nurseController', function ($scope, NurseService, $state, $cookies) {

         $scope.theme = "nurseViews";

         if (!$cookies.get("nurseObj") || $cookies.getObject("nurseObj").access !== "nurse") {
            $state.go('login');
         }
         $scope.logout = function () {
            NurseService.logout()
               .then(function () {
                  $state.go('login');
               });
         };
      });


}());
