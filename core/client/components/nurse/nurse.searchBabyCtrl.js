(function () {
    "use strict";

    angular.module('app')
        .controller('searchBabyCtrl', function ($scope, NurseService) {
            $scope.getBabies = function() {
            NurseService.getBabies().then(function(res) {
            	$scope.babies = res;
            	console.log($scope.babies);
                 });	
        };
        $scope.getBabies();
    });


} ());