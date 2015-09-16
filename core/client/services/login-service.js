angular.module('app')
   .service('LoginService', function ($http, $q, $state) {
      this.validateLogin = function (login) {
         console.log(login)
         var defer = $q.defer();
         var url = '/user/login';
         $http({
            method: 'POST',
            url: url,
            data: JSON.stringify(login),
         }).then(function (res) {
            console.log('.then is responding');
            console.log('response', res.data);
            if (res) {
               $state.go('medical');
            };
         })
      }
   });
