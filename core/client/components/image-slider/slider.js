angular.module('app')
   .controller('sliderCtrl', function ($scope, image, $mdDialog) {
      console.log('slider controller');
      if (!image) {
         console.log('image undefined');
         $mdDialog.hide();
      } else {

         console.log(image);
         $scope.image = image;
      }

   })
