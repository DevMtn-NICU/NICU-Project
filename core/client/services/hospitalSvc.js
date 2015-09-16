(function() {
  "use strict";
  angular.module("app").service("hospitalSvc", function($http, $q) {
    this.getStaff = function() {
      var deferred = $q.defer();
      $http({
        url: "/api/staff",
        method: "GET"
      }).then(function(response) {
        deferred.resolve(response.data);
      });
      return deferred.promise;
    };
  });
} ());
