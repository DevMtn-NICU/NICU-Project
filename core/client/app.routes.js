(function () {
   "use strict";

   angular.module('app')
      .config(function ($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/');

         $stateProvider
            .state('home', {
               url: '/',
               templateUrl: 'components/home/home-template.html',
               controller: 'homeController'
            })
            .state('medical', {
               url: '/medical',
               templateUrl: 'components/nurse/nurse-template.html',
               controller: 'nurseController'
            })
            .state('medical.search', {
               url: '/search',
               templateUrl: 'components/nurse/search_baby.html',
               controller: 'nurseController'
            })
            .state('medical.create_account', {
               url: '/account',
               templateUrl: 'components/nurse/nurse.makeBabyTmpl.html',
               controller: 'makeBabyCtrl'
            });


      });


}());
