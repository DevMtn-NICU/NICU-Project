(function () {

  "use strict";

   angular.module('app').controller('parentViewCtrl', function ($scope, parentService, $stateParams, $state, $cookies, $mdSidenav, $mdDialog, initialBaby) {
     if(!$cookies.getObject("userId")) {
       $state.go('login');
     }
      $scope.babies = [];
      $scope.cookieBabies = $cookies.getObject("parentObj").babies;
      $scope.cookieBabies.concat($cookies.getObject("contactObj").babies);

      $scope.toggleSidenav = function() {
        $mdSidenav('menu').toggle();
      };

      $scope.getBabyById = function (babyId) {
         parentService.getBabyById(babyId)
            .then(function (response) {
               $scope.babies.push(response);
            });
      };

      for (var i = 0; i < $scope.cookieBabies.length; i++) {
         $scope.getBabyById($scope.cookieBabies[i]);
      }

      $scope.currentBaby = initialBaby;

      $scope.$watch('currentBaby', function () {
         $scope.$broadcast('babyChanged');
      });

      $scope.$on('babyChanged', function (e) {
         if ($scope.currentBaby) {
            parentService.setBabyId($scope.currentBaby._id);
            parentService.getBabyById($scope.currentBaby._id)
            .then(function(response) {
              $scope.theme = response.theme;
            });
         }
      });


      if ($scope.currentBaby) {
        $scope.theme = $scope.currentBaby.theme || 'Neutral';
      }

      $scope.themeList = [
              'Neutral',
              'CamoGreen',
              'BabyBlue',
              'Purple',
              'RosePink',
              'Bright'
          ];

    $scope.changeTheme = function (theme) {
      if($scope.currentBaby) {
        parentService.changeTheme(theme, $scope.currentBaby._id)
        .then(function (response) {
          $scope.theme = response.theme;
        });
      }
    };

      $scope.logout = function() {
				parentService.logout()
				.then(function() {
					$state.go('login');
				});
			};


      $scope.openPasswordModal = function() {
        $mdDialog.show({
           templateUrl: "./components/modal-templates/changePasswordModal.html",
           controller: "changePasswordCtrl",
           locals: {
             theme: $scope.theme
           }
        });
      };
   });


}());
