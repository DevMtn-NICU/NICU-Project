(function () {
   "use strict";

   angular.module('app').controller('parentSettingsCtrl', function ($scope, parentService, $stateParams, $state) {
      //watches for dropdown in parent scope to change
      $scope.$on('babyChanged', function (e) {
         if ($scope.$parent.currentBaby) {
            $scope.babyId = $scope.$parent.currentBaby._id;
            $scope.getContacts($scope.babyId);
         }
      });

      $scope.contacts = [];

      $scope.getContacts = function (babyId) {
         parentService.getBabyById(babyId)
            .then(function (response) {
               $scope.contacts = [];
               var lvl1 = response.level1;
               var lvl2 = response.level2;
               for (var i = 0; i < lvl1.length; i++) {
                  Object.defineProperty(lvl1[i], 'level', {
                     writable: true,
                     value: 1
                  });
                  $scope.contacts.push(lvl1[i]);
               }
               for (var x = 0; x < lvl2.length; x++) {
                  Object.defineProperty(lvl2[x], 'level', {
                     writable: true,
                     value: 2
                  });
                  $scope.contacts.push(lvl2[x]);
               }
            });
      };

      if ($scope.$parent.currentBaby) {
         $scope.babyId = $scope.$parent.currentBaby._id;
         $scope.getContacts($scope.babyId);
      }

      $scope.clearFields = function () {
         $scope.auth = {};
         $scope.auth.email = '';
      };

      // remove this empty array and push call below when retrieving contacts properly from baby...just wanted it for testing
      // $scope.contacts = [];
      $scope.authLevel = function () {
         $scope.auth.password = "test";
         $scope.auth.babies = $scope.$parent.babies;
         $scope.auth.babyId = $scope.$parent.currentBaby._id;
         console.log('parent scope', $scope.$parent.babies);

         console.log('scope auth pass: ', $scope.auth);
         parentService.authLevel($scope.auth).
         then(function (response) {
            $scope.clearFields();
            $scope.getContacts($scope.babyId);
         });
      };
      console.log($scope.auth);

      $scope.removeContact = function (contactId, level) {
         var babyAuth = {
            id: $scope.babyId,
            level: level
         };
         parentService.removeContact(contactId, babyAuth)
            .then(function (response) {
               $scope.getContacts($scope.babyId);
            });
      };
   });
}());
