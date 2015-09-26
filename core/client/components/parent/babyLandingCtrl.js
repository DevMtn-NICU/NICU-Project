(function () {
   "use strict";

   angular.module('app')
      .controller('babyLanding',
         function ($scope, parentService, $mdDialog, $stateParams, $cookies, $rootScope) {
            $scope.baby = {};

            function getCurrentBaby() {
               var babyId = parentService.sendBabyId();
               if (babyId) {
                  parentService.getBabyById(babyId)
                     .then(function (baby) {
                        $scope.baby = baby;
                        $scope.notes = baby.notes;
                     })
                  return $scope.baby, $scope.notes;
               }
               console.log('getCurrentBaby failed');
            }
            getCurrentBaby();

            $scope.getImages = function (babyId) {
               parentService.getBabyById(babyId)
                  .then(function (baby) {
                     var recentImages = [];
                     for (var i=baby.notes.length -1; i>=0; i--) {
                        if (baby.notes[i].picturesUrl) {
                           console.log(baby.notes[i].picturesUrl);
                           recentImages.push(baby.notes[i].picturesUrl);
                           if (recentImages.length === 2) {
                              $scope.recentImages = recentImages;
                           }
                        }
                     }
                     $scope.recentImages = recentImages;
                  })
            }

            $scope.addJournalEntry = function() {
               parentService.addJournalEntry($scope.baby._id, $scope.journalEntry)
               .then(function (baby) {
                  $scope.baby.journal = baby.journal;
                  $scope.journalEntry = "";
               })
            }

            //watches for dropdown in parent scope to change
            $scope.$on('babyChanged', function (e) {
               if ($scope.$parent.currentBaby) {
                  $scope.baby = $scope.$parent.currentBaby;
                  $scope.getBaby($scope.baby._id);

                  $cookies.putObject("babyId", $scope.baby._id);
                  $scope.getImages($scope.baby._id);
               }
            });


            $scope.getBaby = function (babyId) {
               parentService.getBabyById(babyId)
                  .then(function (baby) {
                     $scope.baby = baby;
                     $scope.notes = baby.notes;
                  });
            };

         });

}());
