(function () {
  "use strict";
  angular.module('app').controller('makeBabyCtrl', function ($scope, makeBabySvc, $mdDialog, $state) {
      $scope.showAdd = true;

    $scope.makeBaby = function() {
      makeBabySvc.makeBaby($scope.baby, $scope.parent1, $scope.parent2)
      .then(function(response) {
        $mdDialog.show({
          templateUrl: "./components/modal-templates/makeBabyConfirmationModal.html",
          locals: {
            baby: response,
            close: $scope.closeModal
          },
          controller: "makeBabyConfirmationModalCtrl"
        });
        $scope.baby = {};
        $scope.parent1 = {};
        $scope.parent2 = {};
      });
    };
      
      $scope.clearFields = function() {
          $scope.note = {};
            $state.go('medical.search');
      }
  });
} ());
