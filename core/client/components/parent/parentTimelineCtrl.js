(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService) {

      $scope.note = {};
      $scope.note.stats = {};
      $scope.theBaby = promised;

} ());
