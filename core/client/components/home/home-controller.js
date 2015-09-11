(function () {
   "use strict";

   angular.module('app')
      .controller('homeController', function ($scope) {
         $scope.test = "blah blah blah";

         $scope.nurseLogin = function () {
            nurseLogin();
         }

         $scope.parentLogin = function () {
            alert("FACT: the nurse instantiated your baby");
         }

         function nurseLogin() {
            console.log("doc body: ", angular.element(document.body));
            $mdDialog.show({
               template: '<md-dialog aria-label="List Dialog">' +
                  '  <md-dialog-content>' +
                  '     <p>HEY THERE!!! {{ test }} </p>' +
                  '  </md-dialog-content>' +
                  '</md-dialog>',
               locals: {
                  test: $scope.test
               },
               controller: homeController
            });

         };


      });
}());
