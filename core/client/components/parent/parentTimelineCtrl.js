(function () {
  "use strict";

  angular.module('app')
    .controller('parentTimelineCtrl', function ($scope, promised, parentService) {

      $scope.theBaby = promised;

    })

} ());
