angular.module('app')
.service('NurseService', function ($http, $q) {

    this.addBabyNote = function(note) {
        var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/babyNote' + note.id,
		}).then(function(response) {
			var results = response.data;
			deferred.resolve(results);
		});
		return deferred.promise;
	};

});
