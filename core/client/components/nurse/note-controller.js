(function () {
  "use strict";

  angular.module('app')
    .controller('noteController', function ($scope, promised, NurseService, $mdDialog, $state, $cookies) {

        $scope.note = {};
        $scope.note.stats = {};
        $scope.theBaby = promised;
        $scope.images = [];

        // set details to load in disabled inputs
        $scope.theBaby.revisedName = $scope.theBaby.firstName + " " + $scope.theBaby.lastName;
        var revisedParents = [];
        $scope.revise = function() {
            var parents = $scope.theBaby.parents;
            for (var i=0; i < parents.length; i++) {
                revisedParents.push(parents[i].name);
            }
            $scope.theBaby.revisedParents = revisedParents.join(", ");
        }();

        // cancel button
        $scope.cancelFn = function () {
            $state.go('medical.search')
        }

        // open modal
        $scope.floatTheModal = function() {
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
        $scope.hideModal = function() {
            $mdDialog.hide();
        }
        // make Baby note
        $scope.addBabyNote = function () {
           $scope.note.baby = promised._id;
           $scope.note.creator = $cookies.getObject('name');
           NurseService.addBabyNote($scope.note).
           then(function (response) {
               $scope.hideModal();
               $state.go('medical.search')
           })
        };

     })

} ());
