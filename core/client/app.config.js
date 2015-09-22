(function() {
	"use strict";
	angular.module("app")
		.config(function($mdThemingProvider) {

			var soRealItsScary = $mdThemingProvider.extendPalette('green', {
				'900': '84BAF9',
				'600': '84F9D8',
				'500': '9AEB6C',
				'200': 'D4F984'
			});
			var pink3 = $mdThemingProvider.extendPalette('pink', {
				'200': 'F984F2'
			});

			$mdThemingProvider.definePalette('green', soRealItsScary);
			$mdThemingProvider.definePalette('pink', pink3);
  			
			$mdThemingProvider.theme('default')
				.primaryPalette('green', {
					'default': '500',
					'hue-1': '200',
					'hue-2': '600'
				})
				.accentPalette('pink', {
					'default': '200'
				})
				.warnPalette('green', {
					'default': '900'
				})

		$mdThemingProvider.alwaysWatchTheme(true);

		$mdThemingProvider.setDefaultTheme('green');

		});

	angular.module("app")
		.config(function($mdThemingProvider) {

			var roseCupcake = $mdThemingProvider.extendPalette('pink', {
				'900': 'FA90A4',
				'600': 'ED205E',
				'500': 'FFCED2',
				'200': 'F5DBE6'
			});
			var oceanPearlRose = $mdThemingProvider.extendPalette('brown', {
				'200': 'EFE5D7'
			});

			$mdThemingProvider.definePalette('pink', roseCupcake);
			$mdThemingProvider.definePalette('brown', oceanPearlRose);
  
			$mdThemingProvider.theme('pink')
			.primaryPalette('pink', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('brown', {
				'default': '200'
			})
			.warnPalette('pink', {
				'default': '900'
			})
		});

	angular.module("app")
		.config(function($mdThemingProvider) {

			var puffyPurplePigs = $mdThemingProvider.extendPalette('purple', {
				'900': 'BB94E7',
				'600': 'C39AF8',
				'500': 'D1ABF6',
				'200': 'F8D6FF'
			});
			var softWhite = $mdThemingProvider.extendPalette('brown', {
				'200': 'F8DCD0'
			});

			$mdThemingProvider.definePalette('purple', puffyPurplePigs);
			$mdThemingProvider.definePalette('brown', softWhite);

			$mdThemingProvider.theme('purple')
			.primaryPalette('purple', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('brown', {
				'default': '200'
			})
			.warnPalette('purple', {
				'default': '900'
			})
		});

	angular.module("app")
		.config(function($mdThemingProvider) {

			var babyShowerBenjamin = $mdThemingProvider.extendPalette('light-blue', {
				'900': 'BDCFE8',
				'600': 'D6D6D6',
				'500': 'DBEAFF',
				'200': 'ECF3F7'
			});
			var her = $mdThemingProvider.extendPalette('brown', {
				'200': 'FFFDF2'
			});

			$mdThemingProvider.definePalette('light-blue', babyShowerBenjamin);
			$mdThemingProvider.definePalette('brown', her);

			$mdThemingProvider.theme('light-blue')
			.primaryPalette('light-blue', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('brown', {
				'default': '100'
			})
			.warnPalette('light-blue', {
				'default': '900'
			})
		});

	angular.module("app")
		.config(function($mdThemingProvider) {

			var watchYourTone = $mdThemingProvider.extendPalette('green', {
				'900': '849E5D',
				'600': '606437',
				'500': '83894D',
				'200': 'A8B063'
			});
			var slurringYourSpeech = $mdThemingProvider.extendPalette('light-green', {
				'200': 'CDD678'
			});

			$mdThemingProvider.definePalette('green', watchYourTone);
			$mdThemingProvider.definePalette('light-green', slurringYourSpeech);
    	
			$mdThemingProvider.theme('green')
			.primaryPalette('green', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('light-green', {
				'default': '200'
			})
			.warnPalette('green', {
				'default': '900'
			})
		});
			

	

})();