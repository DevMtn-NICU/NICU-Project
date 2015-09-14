//the baby note script will need to create empty objects for this to work
// angular.module('app').controller('mainCtrl', function($scope) {
//   $scope.newBabyNote = {};
//   $scope.newBabyNote.stats = {};
// });


(function () {
  "use strict";

  angular.module('app')
    .directive('addStat', function () {

      return {
        restrict: 'E',
        templateUrl: 'addStat.html',

        controller: function ($scope) {
          if (!$scope.newBabyNote.stats.other) $scope.newBabyNote.stats.other = [];
          console.log($scope.newBabyNote);
          $scope.addStat = function (idx) {
            $scope.newBabyNote.stats.other.push({});
          };
        }
      };
    });

} ());