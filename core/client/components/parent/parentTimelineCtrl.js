(function () {
  "use strict";

  angular.module('app')
    .controller('parentTimelineCtrl', function ($scope, parentService, $stateParams) {

      $scope.baby = $scope.$parent.baby;
      
    })
} ());
