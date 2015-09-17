(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService) {

      $scope.theBaby = promised;

} ());
