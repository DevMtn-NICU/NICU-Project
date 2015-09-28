(function () {
   "use strict";

   angular.module('app')
      .controller('parentCreateNoteCtrl', function ($scope, parentService, $mdDialog, $state) {

         $scope.$on('babyChanged', function (e) {
            if ($scope.$parent.currentBaby) {
               $scope.theBaby = $scope.$parent.currentBaby;
            }
         });

         $scope.showForParent = "true";

         $scope.note = {};
         $scope.note.stats = {};
         if ($scope.$parent.currentBaby) {
            $scope.theBaby = $scope.$parent.currentBaby;
         }
         $scope.images = [];

         // clear the note
         $scope.cancelFn = function () {
            $state.go('parent.landing');
         };

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
         };
         // close modal
         $scope.hideModal = function () {
            $mdDialog.hide();
         };
         // make Baby note
         $scope.addBabyNote = function () {
            $scope.note.baby = $scope.theBaby._id;
            $scope.note.creator = $cookies.getObject('name');
            if (!$scope.note.stats.oxygen) {
               delete($scope.note.stats.oxygen);
            }
            if (!$scope.note.stats.heartRate) {
               console.log('number');
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
                parentService.addBabyNote($scope.note).
                then(function (response) {
                   $scope.hideModal();
                   $state.go('parent.landing');
                   $scope.$emit("addedNote");
               })
            } else {
                console.log('failed');
            };
         };

      });

}());
