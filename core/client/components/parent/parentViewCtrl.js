(function () {

  "use strict";    

   angular.module('app').controller('parentViewCtrl', function ($scope, parentService, $stateParams, $state, $cookies) {
      $scope.babies = [];
      $scope.cookieBabies = $cookies.getObject("parentObj").babies;
      $scope.cookieBabies.concat($cookies.getObject("contactObj").babies);



      $scope.getBabyById = function (babyId) {
         parentService.getBabyById($scope.cookieBabies[i])
            .then(function (response) {
               $scope.babies.push(response);
               $scope.currentBaby = $scope.babies[0];
            });
      };

      for (var i = 0; i < $scope.cookieBabies.length; i++) {
         $scope.getBabyById($scope.cookieBabies[i]);
      }


      $scope.$watch('currentBaby', function () {
         $scope.$broadcast('babyChanged');
          if($scope.currentBaby) {
            $scope.theme = $scope.currentBaby.theme;
          }
      });

      $scope.$on('babyChanged', function (e) {
         console.log('babychanged $scope', $scope.currentBaby._id);
         parentService.setBabyId($scope.currentBaby._id);
      });

      if ($scope.currentBaby) {
        $scope.theme = $scope.currentBaby.theme || 'myDefault';
      }

      $scope.themeList = [
              'myDefault',
              'camoGreen',
              'showerBlue',
              'puffyPurple',
              'rosePink'
          ];

    $scope.changeTheme = function () {
      if($scope.currentBaby) {
        parentService.changeTheme($scope.theme, $scope.currentBaby._id)
        .then(function (response) {
          $scope.theme = response.theme;

        })
      }
    }

    $scope.$watch('theme', function() {
      $scope.changeTheme();
    });

   });


}());
