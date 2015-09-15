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
				.state('medical.search', {
					url: '/medical/search',
					templateUrl: 'components/nurse/search_baby.html',
					controller: 'nurseController'
				})
				.state('medical.create_account', {
					url: '/medical/account',
					templateUrl: 'components/nurse/create_account.html',
					controller: 'nurseController'
				})
				.state('medical.create_note', {
						url: '/medical/create_note/:id',
						templateUrl: 'components/nurse/create_note.html',
						controller: 'noteController',
						resolve: {
							promised: function($http) {
								return $http({
										method: 'GET',
										url: '/api/babies:id'
									})
									.then(function(response) {
										return response.data[0];
									});
							}
					}
				})

		});


}());
