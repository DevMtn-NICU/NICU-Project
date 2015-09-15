(function() {
	"use strict";
	angular.module("app").service('imageService', function($http) {
	var service = {}

	service.storeImage = function(imageData, filename) {
		var imageExtension = imageData.split(';')[0].split('/');
		imageExtension = imageExtension[imageExtension.length - 1];
		console.log(imageExtension);

		var newImage = {
			imageName: filename
			,imageBody: imageData
			,imageExtension: imageExtension
			,userEmail: 'sarahmaetennessee@gmail.com'
		}

		return $http.post('/api/newimage', newImage)
	}
	return service;
	});
});