(function () {
   "use strict";

   angular.module('app')
      .controller('contactLandingCtrl', function ($scope, $mdDialog, contactService) {
         $scope.baby = $scope.$parent.currentBaby;
         $scope.notes = $scope.baby.notes;

         $scope.$on('babyChanged', function (e) {
            if ($scope.$parent.currentBaby) {
               $scope.baby = $scope.$parent.currentBaby;
               $scope.notes = $scope.baby.notes;
               $scope.getImages($scope.baby._id);
            }
         });

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

         $scope.getImages();

         $scope.imageModal = function (myImage) {
            console.log('image modal');
            $mdDialog.show({
               templateUrl: 'components/image-slider/slider.html',
               locals: {
                  image: myImage
               },
               controller: 'sliderCtrl',
               clickOutsideToClose: true
            });

         };

      });

}());
