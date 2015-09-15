app.directive('fileread', function (imageService) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			console.log(scope, elem, attrs);
			elem.bind("change", function (changeEvent) {

				var reader = new FileReader();
				reader.onloadend = function (loadEvent) {
					var fileread = loadEvent.target.result;

					var tempArray = elem[0].value.split('\\');
					var fileName = tempArray[tempArray.length - 1];
				}

				scope.images.unshift(result.data);
				
			})
		reader.readAsSataURL(changeEvent.target.files[0]);
		};
	}
})