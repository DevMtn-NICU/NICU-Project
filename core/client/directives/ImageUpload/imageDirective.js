(function() {
	"use strict";
	angular.module("app").directive('fileread', function (imageService) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			console.log(scope, elem, attrs);
			elem.bind("change", function (changeEvent) {

				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					var fileread = loadEvent.target.result;

					var tempArray = elem[0].value.split('\\');
					// why is this 0 instead of what the tutorial has as 'context'
					var fileName = tempArray[tempArray.length - 1];

		imageService.storeImage(fileread, fileName)
          .then(function (result) {
            scope.imageId = result.data.Location;
            console.log(result.data)
            scope.images.unshift(result.data);
          }).catch(function (err) {
            console.log(err);
          })
	    }
		reader.readAsDataURL(changeEvent.target.files[0]);
				})
		}
	}
 })
}());