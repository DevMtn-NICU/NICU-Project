angular.module('app')
   .controller('sliderCtrl', function ($scope, image) {
      console.log('slider controller');

      console.log(image);
      $scope.image = image;
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


      $scope.images = [
         {
            image: 'nurse6.png',
            description: 'Image 00'
         },
         {
            image: 'images/img01.jpg',
            description: 'Image 01'
         },
         {
            image: 'images/img02.jpg',
            description: 'Image 02'
         },
         {
            image: 'images/img03.jpg',
            description: 'Image 03'
         },
         {
            image: 'images/img04.jpg',
            description: 'Image 04'
         }
       ];


   })
