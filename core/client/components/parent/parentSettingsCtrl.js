(function () {
   "use strict";

   angular.module('app').controller('parentSettingsCtrl', function ($scope, parentService, $stateParams, $state) {

		  $scope.clearFields = function() {
	          $scope.auth = {};
			  $scope.auth.email = '';
	      };

          // remove this empty array and push call below when retrieving contacts properly from baby...just wanted it for testing
          $scope.contacts = [];
		  $scope.authLevel = function() {
			  $scope.auth.roles = "contact";
              $scope.auth.password = "scrumptious"
			  parentService.authLevel($scope.auth).
			  then(function(response){
                  $scope.contacts.push(response);

			  });
		  };


      })
}());
