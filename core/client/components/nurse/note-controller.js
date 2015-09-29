(function () {
   "use strict";

   angular.module('app')
      .controller('noteController', function ($scope, promised, NurseService, $mdDialog, $state, $cookies) {

         $scope.note = {};
         $scope.note.stats = {};
         $scope.theBaby = promised;
         $scope.images = [];

         // create patient's full name, to put in disabled input fields
         $scope.getFullName = function() {
             if ($scope.theBaby.middleName) {
                $scope.patientFullName = $scope.theBaby.firstName + " " + $scope.theBaby.middleName + " " + $scope.theBaby.lastName;
             }
             else $scope.patientFullName = $scope.theBaby.firstName + " " + $scope.theBaby.lastName;
         }();
         // create string of parents' names, to put in disabled input fields
         $scope.getParentNames = function() {
             var patientParents = [];
             for (var i = 0; i < $scope.theBaby.parents.length; i++) {
                 patientParents.push($scope.theBaby.parents[i].name);
             }
             $scope.patientParents = patientParents.join(', ');
         }();

         // cancel button redirects
         $scope.cancel = function () {
            $state.go('medical.search');
         }

         // open modal
         $scope.floatTheModal = function () {
             if ($scope.note.picturesUrl) {
                 $scope.shortUrl = $scope.note.picturesUrl;
                 $scope.shortUrl = $scope.shortUrl.split('/');
                 $scope.shortUrl = $scope.shortUrl[$scope.shortUrl.length -1];
             };
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
            $scope.note.stats.heartRate = parseInt($scope.note.stats.heartRate);
            $scope.note.stats.oxygen = parseInt($scope.note.stats.oxygen);
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
