angular.module('app')
.service('LoginService', function ($http, $q) {
   this.validateLogin = function (login) {
      console.log(login)
      var defer = $q.defer();
      var url = '/URLGOES/HERE';
      $http({
        method: 'PUT',
         url: url,
         data: JSON.stringify(login),
      }).then(function (res) {
         console.log('response', res);
      })
   }
});