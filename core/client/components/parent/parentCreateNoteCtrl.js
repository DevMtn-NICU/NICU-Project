(function () {
   "use strict";

   angular.module('app')
      .controller('parentCreateNoteCtrl', function ($scope, promised, parentService, $mdDialog) {



         $scope.note = {};
         $scope.note.stats = {};
         $scope.theBaby = promised;
         $scope.images = [];

         $scope.addBabyNote = function () {
            $scope.note.baby = promised._id;
            $scope.note.stats.heartRate = parseInt($scope.note.stats.heartRate);
            $scope.note.stats.oxygen = parseInt($scope.note.stats.oxygen);
            $scope.note.picturesUrl = $scope.imageId;
            parentService.addBabyNote($scope.note).
            then(function (response) {
               $mdDialog.show({
                  templateUrl: "./components/modal-templates/parentAddNoteConfirmationModal.html",
                  locals: {
                     baby: response,
                     theBaby: $scope.theBaby
                  },
                  controller: "parentAddNoteConfirmationModalCtrl",
               });
            })

         };

         $scope.clearFields = function () {
            $scope.note = {};
         }

      })

}());
