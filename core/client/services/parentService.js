(function () {
   "use strict";

   angular.module('app')
      .service('parentService', function ($http, $q) {

         this.addBabyNote = function (note) { //this is a repeat from the nurse service, we might want to refactor
            var deferred = $q.defer();
            $http({
               method: 'POST',
               url: '/babyNote',
               data: note
            }).then(function (response) {
               var results = response.data;
               deferred.resolve(results);
            });
            return deferred.promise;
         };

		this.getBabyById = function(id) {  //this is a repeat from the nurse service, we might want to refactor
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: '/api/babies/' + id,
			}).then(function(response) {
				var results = response.data;
				deferred.resolve(results);
			});
			return deferred.promise;
		};

		this.authLevel = function(auth) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: '/user/createContact',
				data: auth
			}).then(function (response) {
				var results = response.data;
				deferred.resolve(results);
			});
			return deferred.promise;
		}

     this.getBabyNote = function (id) {
        var deferred = $q.defer();
        $http({
           method: 'GET',
           url: '/babyNote/55f9a43cc70eca503372d5e4',
        }).then(function (res) {
           var results = res.data;
           deferred.resolve(results);
        });
        return deferred.promise;
     }

  });
}());
