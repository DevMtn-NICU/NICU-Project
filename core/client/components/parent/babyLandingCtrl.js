(function () {
   "use strict";

   angular.module('app')
      .controller('babyLanding',
         function ($scope, parentService, $mdDialog, $stateParams, $cookies) {

            $scope.babies = $cookies.getObject("parentObj").babies;
            console.log($scope.babies);
            $scope.notes = [];
            parentService.getBabyById($scope.babies[1])
               .then(function (baby) {
                  for (var i = (baby.notes.length - 1); i >= 0; i--) {
                     var noteId = baby.notes[i]._id;

                     parentService.getBabyNote(noteId)
                        .then(function (note) {
                           $scope.notes.push(note);
                           console.log('babyLandingCtrl $scope.notes[0]: ', $scope.notes[0]);
                        })

                  }



               });


            //            $scope.stats = $scope.note.stats;
            //            $scope.baby = $scope.note.baby;
            //            $scope.comment = $scope.note.comment;

         });
}());
