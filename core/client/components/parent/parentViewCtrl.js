(function () {

  "use strict";

  angular.module('app').controller('parentViewCtrl', function ($scope, parentService, $stateParams, $state, $cookies) {
    $scope.babies = [];
    $scope.cookieBabies = $cookies.getObject("parentObj").babies;
    $scope.cookieBabies.concat($cookies.getObject("contactObj").babies);
    $scope.theme = "";

    // $scope.changeTheme = function() {
    //   $scope
    // }

    $scope.getBabyById = function(babyId) {
      parentService.getBabyById($scope.cookieBabies[i])
      .then(function(response) {
        $scope.babies.push(response);
        $scope.currentBaby = $scope.babies[0];
      });
    };

    for (var i = 0; i < $scope.cookieBabies.length; i++) {
      $scope.getBabyById($scope.cookieBabies[i]);
    }

    $scope.$watch('currentBaby', function() {
      $scope.$broadcast('babyChanged');
      console.log("baby changed");
    });
  });

    // $scope.user = null;
    // $scope.users = null;
    //  $scope.loadUsers = function() {
    // // Use timeout to simulate a 650ms request.
    // return $timeout(function() {
    //   $scope.users =  $scope.users  || [
    //     { id: 1, name: 'Scooby Doo' },
    //     { id: 2, name: 'Shaggy Rodgers' },
    //     { id: 3, name: 'Fred Jones' },
    //     { id: 4, name: 'Daphne Blake' },
    //     { id: 5, name: 'Velma Dinkley' }
    //   ];

}());
