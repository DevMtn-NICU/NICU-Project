(function () {
        "use strict";

        angular.module('app')
                .controller('editController', function ($scope, promised) {
                        $scope.showAdd = false;
                        $scope.baby = promised;
                        $scope.parent1 = {};
                        $scope.parent2 = {};
                        $scope.parent1.name = promised.parents[0].name;
                        $scope.parent2.name = promised.parents[1].name;
                        $scope.parent1.email = promised.parents[0].email;
                        $scope.parent2.email = promised.parents[1].email;
            
                        $scope.makeBaby = function() {
      makeBabySvc.editBaby($scope.baby, $scope.parent1, $scope.parent2)
      .then(function(response) {
        $scope.baby = {};
        $scope.parent1 = {};
        $scope.parent2 = {};
      });
    };
                })

} ());
