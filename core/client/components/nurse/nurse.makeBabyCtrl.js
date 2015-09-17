(function () {
  "use strict";
  angular.module('app').controller('makeBabyCtrl', function ($scope, makeBabySvc, $mdDialog) {
      $scope.showAdd = true;

    $scope.makeBaby = function() {
      makeBabySvc.makeBaby($scope.baby, $scope.parent1, $scope.parent2)
      .then(function(response) {
        $mdDialog.show({
          templateUrl: "./components/modal-templates/makeBabyConfirmationModal.html",
          locals: {
            baby: response
          },
          controller: "makeBabyConfirmationModalCtrl"
        });
        $scope.baby = {};
        $scope.parent1 = {};
        $scope.parent2 = {};
      });
    };
  });
} ());
