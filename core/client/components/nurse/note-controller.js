(function () {
   "use strict";

   angular.module('app')
      .controller('noteController', function ($scope, promised, NurseService, $mdDialog, $state, $cookies) {

         $scope.note = {};
         $scope.note.stats = {};
         $scope.theBaby = promised;
         $scope.images = [];

         $scope.patientFullName = $scope.theBaby.firstName + " " + $scope.theBaby.lastName;

         
         // clear the note
         $scope.clearFields = function () {
            $scope.note = {};
         }

         // open modal
         $scope.floatTheModal = function () {
               $mdDialog.show({
                  templateUrl: "./components/modal-templates/addNoteConfirmationModal.html",
                  scope: $scope,
                  preserveScope: true
               });
            }
            // close modal
         $scope.hideModal = function () {
               $mdDialog.hide();
            }
            // make Baby note
         $scope.addBabyNote = function () {
            console.log("note: ", $scope.note);
            $scope.note.baby = promised._id;

            $scope.note.creator = $cookies.getObject('name');

            if (!$scope.note.stats.oxygen) {
            delete($scope.note.stats.oxygen);
             }
             if (!$scope.note.stats.heartRate) {
                delete($scope.note.stats.heartRate);
                //console.log('oxy', $scope.note.stats.heartRate);
             }
             var validNote = false;

             if ($scope.note.stats.other > 0) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.stats.bathed) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.stats.bloodPressure) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.stats.changed) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.stats.fed) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.stats.weight) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.picturesUrl) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.comment) {
                console.log('true');
                validNote = true;
             } else if ($scope.note.stats.heartRate) {
                validNote = true;
             } else if ($scope.note.stats.oxygen) {
                validNote = true;
             } else {
                validNote = false;
             }

             if (validNote) {
                NurseService.addBabyNote($scope.note).
                then(function (response) {
                   $scope.hideModal();
                   $state.go('medical.search')
                })
             } else {
                console.log('failed');
             }

         };

      })

}());
