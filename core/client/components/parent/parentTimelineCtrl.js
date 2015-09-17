(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, parentService) {

      $scope.theBaby = promised;
      $scope.notes = $scope.theBaby.notes; //This is an array

    })

} ());
