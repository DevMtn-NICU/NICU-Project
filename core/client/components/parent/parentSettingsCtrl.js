(function () {
   "use strict";

   angular.module('app').controller('parentSettingsCtrl', function ($scope, parentService, $stateParams, $state) {

		  $scope.clearFields = function() {
	          $scope.auth = {};
			  $scope.auth.email = '';
	      };


          // remove this most likely when retrieving contacts properly from baby
          $scope.contacts = [];
		  $scope.authLevel = function() {
			  $scope.auth.roles = "contact";
              $scope.auth.password = "scrumptious"
			  console.log("peep being authed: ", $scope.auth);

			  parentService.authLevel($scope.auth).
			  then(function(response){
                  $scope.contacts.push(response);

			  });
		  };




      })
}());
