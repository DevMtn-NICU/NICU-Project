(function() {
	"use strict";
	angular.module("app")
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('neutral')
				.primaryPalette('brown', {
					'default': '300',
					'hue-1': '100',
					'hue-2': '500',
					'hue-3': '400'
				})
				.accentPalette('brown', {
					'default': '900',
					'hue-1': '700'
				})
				.warnPalette('grey', {
					'default': '400',
			});

	angular.module("app")
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('yellowTheme')
			.primaryPalette('yellow', {
				'default': '300',
				'hue-1': '100',
				'hue-2': '400',
				'hue-3': 'A100'
			})
			.accentPalette('yellow', {
				'default': '800',
				'hue-1': '700',
			})
			.warnPalette('yellow', {
				'default': '900',
			})

	angular.module("app")
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('pinkTheme')
			.primaryPalette('pink', {
				'default': '200',
				'hue-1': '50',
				'hue-2': '400',
				'hue-3': 'A100'
			})
			.accentPalette('pink', {
				'default': '900',
				'hue-1': '700',
			})
			.warnPalette('purple', {
				'default': '900',
			})

	angular.module("app")
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('blueTheme')
			.primaryPalette('light-blue', {
				'default': '400',
				'hue-1': '100',
				'hue-2': '600',
				'hue-3': 'A100'
			})
			.accentPalette('light-blue', {
				'default': '700',
				'hue-1': 'A400',
			})
			.warnPalette('blue', {
				'default': '900',
			})

	angular.module("app")
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('greenTheme')
			.primaryPalette('green', {
				'default': '400',
				'hue-1': '100',
				'hue-2': '600',
				'hue-3': 'A100'
			})
			.accentPalette('green', {
				'default': 'A400',
				'hue-1': 'A700',
			})
			.warnPalette('green', {
				'default': '900',
			})
			

		$mdThemingProvider.alwaysWatchTheme(true);

		$mdThemingProvider.setDefaultTheme('neutral');
	})
} ());