angular.module('app')
.service('LoginService', function ($http, $q) {
   this.validateLogin = function (login) {
      console.log(login)
      var defer = $q.defer();
      var url = '/user/login';
      $http({
        method: 'POST',
         url: url,
         data: JSON.stringify(login),
      }).then(function (res) {
         console.log('response', res);
      })
   }
});