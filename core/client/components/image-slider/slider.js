angular.module('app')
   .controller('sliderCtrl', function ($scope) {
      console.log('slider controller');


      $scope.getImages = function (babyId) {
         parentService.getBabyById(babyId)
            .then(function (baby) {
               var recentImages = [];
               for (var i = baby.notes.length - 1; i >= 0; i--) {
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
      
      
   })
