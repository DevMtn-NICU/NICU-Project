(function () {
   "use strict";

   angular.module('app')
      .controller('homeController', function ($scope) {
         $scope.test = "blah blah blah";

         $scope.nurseLogin = function () {
            alert("you have been upgraded from patient to doctor, now for surgery, don't worry you can do it just cut along the dotted line");
         }

         $scope.parentLogin = function () {
            alert("FACT: the nurse instantiated your baby");
         }

      });


}());
