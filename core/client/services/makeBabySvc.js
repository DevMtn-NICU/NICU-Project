(function() {
  "use strict";
  angular.module("app").service("makeBabySvc", function($http, $q) {
    this.makeBaby = function(baby, parent1, parent2) {
      var deferred = $q.defer();
      $http({
        url: "/api/makeBaby",
        method: "POST",
        data: {
          baby: baby,
          parent1: parent1,
          parent2: parent2
        }
      }).then(function(response) {
        deferred.resolve(response.data);
      });
      return deferred.promise;
    };

    this.editBaby = function(baby, parent1, parent2) {
      var deferred = $q.defer();
      $http({
        url: "/api/babies/" + baby._id,
        method: "PUT",
        data: {
          baby: baby,
          parent1: parent1,
          parent2: parent2
        }
      }).then(function(response) {
        console.log("This is the response from server: ", response.data);
        deferred.resolve(response.data);
      });
      return deferred.promise;
    };


  });
} ());
