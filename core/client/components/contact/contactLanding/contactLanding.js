(function () {
   "use strict";

   angular.module('app')
      .controller('contactLandingCtrl', function ($scope, $mdDialog, contactService) {
         console.log('contact landing controll');
         $scope.baby = $scope.$parent.currentBaby;
         console.log("current baby: ", $scope.$parent.currentBaby);

      });

}())
