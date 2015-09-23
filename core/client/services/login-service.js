angular.module('app')
   .service('LoginService', function ($http, $q, $state, $cookies) {
      this.validateLogin =  function (login) {
         console.log(login);
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
            var user = res.data;
            $cookies.putObject("userId", user._id);
            $cookies.putObject("userRoles", user.roles);
            $cookies.putObject("userEmail", user.email);
            $cookies.putObject("parentObj", user.parent);
            $cookies.putObject("contactObj", user.contact);
            $cookies.putObject("nurseObj", user.nurse);
            if (role[0] === 'nurse') {
               $state.go('medical.search');

            } else if (role[0] === 'parent') {
               console.log(res.data._id);

               $state.go('parent.landing', {
                  'user': user
               });
            } else if (role[0] === 'contact') {

               $state.go('parent.landing', {
                  'user': user
               });

            }
         });
      };
   });
