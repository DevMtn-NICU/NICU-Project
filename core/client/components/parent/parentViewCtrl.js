(function () {
   "use strict";

   angular.module('app')
      .controller('parentViewCtrl', function ($scope, parentService, $stateParams, $state) {

         console.log('parentViewCtrl');
         console.log('state params', $stateParams.userId);
         console.log($state.params);

         $scope.theme = "";


         // 	$scope.getBabyById = function() {
         // 		parentService.getBabyById($scope.baby)
         // 		.then(function(response) {
         // 			$scope.baby = {};
         // 		});
         // 	};
         // 	console.log($scope.baby);
      })
}());
