(function () {
   "use strict";
   angular.module("app").service("contactService", function ($http, $q, $cookies) {
     this.getFeed = function(babyId, level) {
       var deferred = $q.defer();
       $http({
         method: "GET",
         url: "/feed/" + babyId + "/" + level
       }).then(function(response) {
         deferred.resolve(response.data);
       });
       return deferred.promise;
     };


   });
}());
