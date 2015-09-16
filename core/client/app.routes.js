(function() {
	"use strict";

	angular.module('app')
		.config(function($stateProvider, $urlRouterProvider) {
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
                .state('medical.edit', {
                    url: '/edit/:id',
                    templateUrl: 'components/nurse/nurse.makeBabyTmpl.html',
                    controller: 'editController',
					resolve: {
						promised: function(NurseService, $stateParams){
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
                        getBabies: function(NurseService){
                            return NurseService.getBabies();
                        }
                    }
				})
				.state('medical.create_note', {
						url: '/create_note/:id',
						templateUrl: 'components/nurse/create_note.html',
						controller: 'noteController',
						resolve: {
							promised: function(NurseService, $stateParams){
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
		});

}());
