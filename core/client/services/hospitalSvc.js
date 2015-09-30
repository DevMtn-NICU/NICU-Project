(function () {
   "use strict";
   angular.module("app").service("hospitalSvc", function ($http, $q) {
      this.getStaff = function () {
         var deferred = $q.defer();
         $http({
            url: "/api/staff",
            method: "GET"
         }).then(function (response) {
            deferred.resolve(response.data);
         });
         return deferred.promise;
      };

      this.createNurse = function (nurse) {
         var deferred = $q.defer();
         $http({
            url: "/api/staff",
            method: "POST",
            data: nurse
         }).then(function (response) {
            deferred.resolve(response.data);
         });
         return deferred.promise;
      };

      this.getOneStaff = function (id) {
         var deferred = $q.defer();
         $http({
            method: "GET",
            url: "/api/staff/" + id
         }).then(function (response) {
            deferred.resolve(response.data);
         });
         return deferred.promise;
      };

      this.editStaff = function (nurse) {
         var deferred = $q.defer();
         $http({
            method: "PUT",
            url: "/api/staff/" + nurse._id,
            data: nurse
         }).then(function (response) {
            deferred.resolve(response.data);
         });
         return deferred.promise;
      };

      this.removeStaff = function (id) {
         var deferred = $q.defer();
         $http({
            method: "DELETE",
            url: "/api/staff/" + id
         }).then(function (response) {
            deferred.resolve(response.data);
         });
         return deferred.promise;
      };
   });
}());
