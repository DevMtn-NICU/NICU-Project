(function() {
	"use strict";
	angular.module("app").directive('fileread', function (imageService) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind("change", function (changeEvent) {

				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					var fileread = loadEvent.target.result;

					var tempArray = elem[0].value.split('\\');
					// why is this 0 instead of what the tutorial has as 'context'
					var fileName = tempArray[tempArray.length - 1];

		imageService.storeImage(fileread, fileName)
          .then(function (result) {
            scope.note.picturesUrl = result.data.Location;
            scope.images.unshift(result.data);
          }).catch(function (err) {
			scope.pictureError = "Selected image is too large to upload.";
          })
	    }
		reader.readAsDataURL(changeEvent.target.files[0]);
				})
		}
	}
 })
}());
