(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService, $mdDialog, $state, $cookies) {

        $scope.note = {};
        $scope.note.stats = {};
        $scope.theBaby = promised;
        $scope.images = [];

        // clear the note
        $scope.clearFields = function () {
           $scope.note = {};
        }

        // open modal
        $scope.floatTheModal = function() {
            $mdDialog.show({
                templateUrl: "./components/modal-templates/addNoteConfirmationModal.html",
                scope: $scope,
                preserveScope: true
            });
        }
        // close modal
        $scope.hideModal = function() {
            $mdDialog.hide();
        }
        // make Baby note
        $scope.addBabyNote = function () {
            console.log("note: ", $scope.note);
           $scope.note.baby = promised._id;
           $scope.note.stats.heartRate = parseInt($scope.note.stats.heartRate);
           $scope.note.stats.oxygen = parseInt($scope.note.stats.oxygen);
           $scope.note.creator = $cookies.getObject('name');
        //    $scope.note.picturesUrl = $scope.note.picturesUrl;
           NurseService.addBabyNote($scope.note).
           then(function (response) {
               $scope.hideModal();
               $state.go('medical.search')
           })
        };

     })

} ());
