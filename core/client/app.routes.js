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
         ////////////   medical /////////////////////////
         .state('medical', {
               url: '/medical',
               templateUrl: 'components/nurse/nurse-template.html',
               controller: 'nurseController'
            })
            .state('medical.edit', {
               url: '/edit/:id',
               templateUrl: 'components/nurse/nurse.makeBabyTmpl.html',
               controller: 'editController',
               resolve: {
                  promised: function (NurseService, $stateParams) {
                     var id = $stateParams.id;
                     return NurseService.getBabyById(id);
                  }
               }
            })
            .state('medical.search', {
               url: '/search',
               templateUrl: 'components/nurse/search_baby.html',
               controller: 'nurseSearchCtrl',
               resolve: {
                  getBabies: function (NurseService) {
                     return NurseService.getBabies();
                  }
               }
            })
            .state('medical.create_note', {
               url: '/create_note/:id',
               templateUrl: 'components/nurse/create_note.html',
               controller: 'noteController',
               resolve: {
                  promised: function (NurseService, $stateParams) {
                     var id = $stateParams.id;
                     return NurseService.getBabyById(id);
                  }
               }
            })
            .state('medical.create_account', {
               url: '/account',
               templateUrl: 'components/nurse/nurse.makeBabyTmpl.html',
               controller: 'makeBabyCtrl'
            })

         ////////////   HOSPITAL /////////////////////////
         .state('hospital', {
               url: '/hospital',
               templateUrl: 'components/hospital/hospital_view.html',
            })
            .state('hospital.search', {
               url: '/search',
               templateUrl: 'components/hospital/hospital_search.html',
               controller: 'hospitalSearchCtrl'
            })
            .state('hospital.add_nurse', {
               url: '/add_nurse',
               templateUrl: 'components/hospital/hospital_add_nurse.html',
               controller: 'hospitalAddNurseCtrl'
            })
            .state('hospital.edit_nurse', {
               url: '/edit/:id',
               templateUrl: 'components/hospital/hospital_add_nurse.html',
               controller: 'hospitalEditNurseCtrl',
               resolve: {
                  promised: function (hospitalSvc, $stateParams) {
                     var id = $stateParams.id;
                     return hospitalSvc.getOneStaff(id);
                  }
               }
            })

         ////////////   parent /////////////////////////
         .state('parent', {
               url: '/parent',
               templateUrl: 'components/parent/parentView.html',
               controller: 'parentViewCtrl'
            })
						.state('parent.main', {
							url: '/main',
							templateUrl: 'components/parent/parentMain.html',
							controller: 'parentMainCtrl'
						})
            .state('parent.settings', {
               url: '/settings',
               templateUrl: 'components/parent/parentSettings.html',
               controller: 'parentSettingsCtrl'
            })
            .state('parent.timeline', {
               url: '/timeline',
               templateUrl: 'components/parent/parentTimeline.html',
               controller: 'parentTimelineCtrl'
            })
            .state('parent.create_note', {
               url: '/create_note/:id',
               templateUrl: 'components/parent/parentCreateNote.html',
               controller: 'parentNoteController',
               resolve: {
                  promised: function (NurseService, $stateParams) {
                     var id = $stateParams.id;
                     return NurseService.getBabyById(id);
                  }
               }
            })
      })
}());
