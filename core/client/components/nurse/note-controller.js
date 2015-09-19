(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService, $mdDialog) {

      $scope.note = {};
      $scope.note.stats = {};
      $scope.theBaby = promised;
    //   $scope.theBaby._id = promised._id;
      $scope.images = [];

      $scope.floatTheModal =function() {
          $mdDialog.show({
            templateUrl: "./components/modal-templates/addNoteConfirmationModal.html",
            locals: {
              theBaby: $scope.theBaby,
              note: $scope.note
            },
            controller: "addNoteConfirmationModalCtrl",
        })
      };

      $scope.clearFields = function() {
          $scope.note = {};
      }



    })

} ());
