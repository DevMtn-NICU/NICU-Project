(function () {
      "use strict";

<<<<<<< HEAD
      angular.module('app')
         .controller('babyLanding',
            function ($scope, parentService, $mdDialog, $stateParams) {
               var testUser = {
                  "_id": "55f882ed9f20e18029a3a831",
                  "email": "dontDeleteMeEver@gmail.com",
                  "name": "test",
                  "created_at": "2015-09-15T20:43:25.282Z",
                  "parent": {
                     "access": "parent",
                     "babies": [
                     "55f882ec9f20e18029a3a830",
                     "55f883299f20e18029a3a833"
                  ]
                  },
                  "roles": [
                  "parent"
               ],
                  "__v": 0
               }
               $scope.notes = [];
               parentService.getBabyById(testUser.parent.babies[1])
                  .then(function (baby) {
                        for (var i = (baby.notes.length - 1); i >= 0; i--) {
                           var noteId = baby.notes[i]._id;

                           parentService.getBabyNote(noteId)
                              .then(function (note) {
                                 $scope.notes.push(note);
                                console.log('babyLandingCtrl $scope.notes[0]: ', $scope.notes[0].baby);
                              })

                              }
                     
                                    
                                 
                        });
=======
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
>>>>>>> master


                     //            $scope.stats = $scope.note.stats;
                     //            $scope.baby = $scope.note.baby;
                     //            $scope.comment = $scope.note.comment;


<<<<<<< HEAD
                  })
         }());
=======
         });
}());
>>>>>>> master
