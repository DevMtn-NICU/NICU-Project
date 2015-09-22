(function () {
   "use strict";

   angular.module('app')
      .service('parentService', function ($http, $q) {
         var babyId;

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

         this.getBabyById = function (id) { //this is a repeat from the nurse service, we might want to refactor

            if (id) {
               var deferred = $q.defer();
               $http({
                  method: 'GET',
                  url: '/api/babies/' + id,
               }).then(function (response) {
                  var results = response.data;
                  babyId = (results._id);
                  deferred.resolve(results);
               });
               return deferred.promise;
            }
            if (!id) {
               console.log('no id given')
            }
         };

         this.sendBabyId = function () {
            return babyId;
         }

         this.setBabyId = function (id) {
            babyId = id;
            console.log('baby id', babyId);
            return babyId;
         }


         this.getBabyNote = function (id) {
            var deferred = $q.defer();
            console.log('parent service getBabyNote: ');
            $http({
               method: 'GET',
               url: '/babyNote/' + id,
            }).then(function (res) {
               var results = res.data;
               deferred.resolve(results);
            });
            return deferred.promise;
         };

         this.authLevel = function (auth) {
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
         };

         this.removeContact = function (contactId, babyAuth) {
            var deferred = $q.defer();
            $http({
               method: "PUT",
               url: "/user/removeContact/" + contactId,
               data: {
                  babyAuth: babyAuth
               }
            }).then(function (response) {
               deferred.resolve(response.data);
            });
            return deferred.promise;
         };

      });
}());
