(function() {
  "use strict";
  angular.module("app").service("makeBabySvc", function($http, $q) {
    this.makeBaby = function(baby, parent1, parent2) {
      var deferred = $q.defer();
      $http({
        url: "/api/makeBaby",
        method: "POST",
        data: {

        }
      });
    };
  });
} ());
