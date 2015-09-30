(function () {
   "use strict";

   angular.module('app')
      .directive('addStat', function () {

         return {
            restrict: 'E',
            templateUrl: 'directives/addStat/addStat.html',
            controller: function ($scope) {
               if (!$scope.note.stats.other) $scope.note.stats.other = [];
               // console.log($scope.note);
               $scope.addStat = function (idx) {
                  $scope.note.stats.other.push({});
               };
            }
         };
      });

}());
