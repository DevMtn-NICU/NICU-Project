angular.module('app')
   .service('LoginService', function ($http, $q, $state, $cookies) {
      this.validateLogin = function (login) {
         var deferred = $q.defer();
         var url = '/user/login';
         $http({
            method: 'POST',
            url: url,
            data: JSON.stringify(login),
         }).then(function (res) {
               var role = res.data.roles;
               var user = res.data;
               $cookies.putObject("userId", user._id);
               $cookies.putObject("userName", user.name);
               $cookies.putObject("userRoles", user.roles);
               $cookies.putObject("userEmail", user.email);
               $cookies.putObject("parentObj", user.parent);
               $cookies.putObject("contactObj", user.contact);
               $cookies.putObject("nurseObj", user.nurse);
               if (role[0] === 'nurse') {
                  $state.go('medical.search');
               } else if (role[0] === 'parent') {
                  $state.go('parent.landing', {
                     'user': user
                  });
               } else if (role[0] === 'contact') {
                  console.log('contact');
                  $state.go('contact.landing');
               }
            },
            //this is the error handeling function
            function (response) {
               deferred.resolve(response);
            });
         return deferred.promise;
      };
   });
