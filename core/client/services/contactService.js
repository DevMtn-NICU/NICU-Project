(function () {
   "use strict";
   angular.module("app").service("contactService", function ($http, $q, $cookies) {
     this.getFeed = function() {
       var babyToGet = $cookies.getObject("contactObj")[0];
       var deferred = $q.defer();
       $http({
         method: "GET",
         url: "/feed/" + babyToGet.baby + "/" + babyToGet.level
       }).then(function(response) {
         deferred.resolve(response.data);
       });
       return deferred.promise;
     };


   });
}());
