angular.module('app')
   .controller('sliderCtrl', function ($scope, image) {
      console.log('slider controller');

      console.log(image);
      $scope.image = image;

   })
