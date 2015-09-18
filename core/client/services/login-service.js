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
            var role = res.data.roles;
            console.log('role', role[0]);
            if (role[0] === 'nurse') {
               $state.go('medical');

            } else if (role[0] === 'parent') {
               console.log(res.data._id);


               var user = res.data;


               $state.go('parent', {
                  'user': user
               });
            }
         })
      }
   });
