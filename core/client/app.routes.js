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
						promised: function($http) {
							return $http({
									method: 'GET',
									url: '/api/babies/:id'
								})
								.then(function(response) {
									console.log(response.data[0]);
									return response.data[0];
								});
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
							promised: function($http) {
								console.log(id);
								return $http({
										method: 'GET',
										url: '/api/babies/:id'
									})
									.then(function(response) {
										console.log(response.data[0]);
										return response.data[0];
									});
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
