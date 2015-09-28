(function () {
   "use strict";

   angular.module('app')
      .controller('babyLanding',
         function ($scope, parentService, $mdDialog, $stateParams, $cookies, $rootScope) {
            $scope.baby = $scope.$parent.currentBaby;
            $scope.notes = $scope.baby.notes;

            function getCurrentBaby() {
               var babyId = parentService.sendBabyId();
               if (babyId) {
                  parentService.getBabyById(babyId)
                     .then(function (baby) {
                        $scope.baby = baby;
                        $scope.notes = baby.notes;
                        $scope.getImages();
                     });
                  return $scope.baby, $scope.notes;
               }
               console.log('getCurrentBaby failed');
            }
            getCurrentBaby();

            $scope.getImages = function () {
              var recentImages = [];
              for (var i = $scope.notes.length - 1; i >= 0; i--) {
                 if ($scope.notes[i].picturesUrl) {
                    recentImages.push($scope.notes[i].picturesUrl);
                    if (recentImages.length === 3) {
                       $scope.recentImages = recentImages;
                       break;
                    }
                 }
              }
              $scope.recentImages = recentImages;
            };

            $scope.addJournalEntry = function () {
               parentService.addJournalEntry($scope.baby._id, $scope.journalEntry)
                  .then(function (baby) {
                     $scope.baby.journal = baby.journal;
                     $scope.journalEntry = "";
                  });
            };

            //watches for dropdown in parent scope to change
            $scope.$on('babyChanged', function (e) {
               if ($scope.$parent.currentBaby) {
                  $scope.baby = $scope.$parent.currentBaby;
                  $scope.getBaby($scope.baby._id);

                  $cookies.putObject("babyId", $scope.baby._id);
                  $scope.getImages();
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
