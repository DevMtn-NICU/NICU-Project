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
            parentService.addBabyNote($scope.note).
            then(function (response) {
               $scope.hideModal();
               $state.go('parent.landing')
            })
         };

      });

}());
