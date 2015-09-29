(function () {
   "use strict";

   angular.module('app')
      .config(function ($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/');

         $stateProvider

            .state('home', {
               url: '/',
               templateUrl: 'components/product/product-page.html',
               controller: 'productController'
            })
            ////////////   LOGIN /////////////////////////
            .state('login', {
               url: '/login',
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
            controller: 'parentViewCtrl',
            params: {
               'user': null
            },
            abstract: true,
            resolve: {
               initialBaby: function (parentService) {
                  return parentService.getInitialBaby();
               }
            }
         })

         .state('parent.landing', {
            url: '',
            templateUrl: 'components/parent/babyLanding.html',
            controller: 'babyLanding',
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
            url: '/create_note',
            templateUrl: 'components/parent/parentCreateNote.html',
            controller: 'parentCreateNoteCtrl'
         })

         .state('parent.journal', {
            url: '/journal',
            templateUrl: 'components/parent/journal.html',
            controller: 'parentCreateNoteCtrl'
         })

         //////// contacts ////////////////////
         .state('contact', {
               url: '/contact',
               templateUrl: 'components/contact/contactView/contactView.html',
               controller: 'contactViewCtrl',
               abstract: true,
               resolve: {
                  baby: function (contactService, $cookies) {
                    var babyToGet = $cookies.getObject("contactObj")[0];
                    return contactService.getFeed(babyToGet.baby, babyToGet.level);
                  }
               }
            })
            .state('contact.landing', {
               url: '',
               templateUrl: 'components/contact/contactLanding/contactLanding.html',
               controller: 'contactLandingCtrl',
            })
            .state('contact.settings', {
               url: '/contact/settings',
               templateUrl: 'components/contact/contactSettings/contactSetting.html',
               controller: 'contactSettingsCtrl'
            })
            .state('contact.timeline', {
               url: '/contact/timeline',
               templateUrl: 'components/contact/contactTimeline/contactTimeline.html',
               controller: 'contactTimelineCtrl'
            });
      });
}());
