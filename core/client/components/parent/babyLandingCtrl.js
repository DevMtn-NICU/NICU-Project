(function () {
   "use strict";

   angular.module('app')
      .controller('babyLanding',
         function ($scope, parentService, $mdDialog, $stateParams, $cookies) {
           $scope.babies = $cookies.getObject("parentObj").babies;

           $scope.note = {};
           parentService.getBabyById($scope.babies[0])
              .then(function (baby) {
                  console.log('this loaded', baby);
                  var note = baby.notes[0]._id;
                  console.log(note);

                  parentService.getBabyNote(note)
                    .then(function (note) {
                        $scope.note = note;

                        $scope.stats = $scope.note.stats;
                        $scope.baby = $scope.note.baby;
                        $scope.comment = $scope.note.comment;
                        console.log($scope.note);
                      });
                      console.log($scope.note);
                      return $scope.note;
            });


            $scope.stats = $scope.note.stats;
            $scope.baby = $scope.note.baby;
            $scope.comment = $scope.note.comment;


         });
}());
