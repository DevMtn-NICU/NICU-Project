(function () {
   "use strict";

   angular.module('app')
      .service('parentService', function ($http, $q, $cookies) {
         var babyId;

         this.getInitialBaby = function () {
            var babyToGet = $cookies.getObject("parentObj").babies[0];
            var deferred = $q.defer();
            $http({
               method: "GET",
               url: "/api/babies/" + babyToGet
            }).then(function (response) {
               deferred.resolve(response.data);
            });
            return deferred.promise;
         };

         this.addBabyNote = function (note) { //this is a repeat from the nurse service, we might want to refactor
            var userId = $cookies.getObject("userId");
            note.creator = userId;
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
               console.log('no id given');
            }
         };

         this.sendBabyId = function () {
            return babyId;
         };

         this.setBabyId = function (id) {
            babyId = id;
            return babyId;
         };


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

         this.addJournalEntry = function (babyId, journalEntry) {
            var deferred = $q.defer();
            $http({
               method: 'POST',
               url: '/api/babies/journal/' + babyId,
               data: {
                  journal: journalEntry
               }
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

         this.changeTheme = function (theme, id) {
            var deferred = $q.defer();
            $http({
               method: "PUT",
               url: "/api/babies/theme/" + id,
               data: {
                  theme: theme
               }
            }).then(function (response) {
               deferred.resolve(response.data);
            });
            return deferred.promise;
         };

         this.logout = function () {
            var deferred = $q.defer();
            $http({
               method: 'GET',
               url: '/logout'
            }).then(function () {
               $cookies.remove("userId");
               $cookies.remove("userName");
               $cookies.remove("userRoles");
               $cookies.remove("userEmail");
               $cookies.remove("parentObj");
               $cookies.remove("contactObj");
               $cookies.remove("nurseObj");
               $cookies.remove("pwdChanged");
               deferred.resolve();
            });
            return deferred.promise;
         };

         this.changePassword = function (password) {
            var deferred = $q.defer();
            $http({
               method: "PUT",
               url: "/user/password/" + $cookies.getObject("userId"),
               data: {
                  password: password
               }
            }).then(function (response) {
               deferred.resolve(response.data);
            });
            return deferred.promise;
         };
      });
}());
