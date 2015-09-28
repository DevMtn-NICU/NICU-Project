(function() {
	"use strict"

	angular.module("app")
		.config(function($mdThemingProvider) {
  			
  			var neutrality = $mdThemingProvider.extendPalette('brown', {
				'900': 'C0B6A5',
				'600': 'CCC7B7',
				'500': 'D9D6D1',
				'200': 'E2DDD1'
			});
			var silkwhite = $mdThemingProvider.extendPalette('grey', {
				'200': 'FDFAF5'
			});

			$mdThemingProvider.definePalette('neutralBrown', neutrality);
			$mdThemingProvider.definePalette('myGrey', silkwhite);
  			
			$mdThemingProvider.theme('Neutral')
				.primaryPalette('neutralBrown', {
					'default': '500',
					'hue-1': '200',
					'hue-2': '600'
				})
				.accentPalette('myGrey', {
					'default': '200'
				})
				.warnPalette('neutralBrown', {
					'default': '900'
				})

			$mdThemingProvider.alwaysWatchTheme(true);
    		$mdThemingProvider.setDefaultTheme('Neutral');

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

			$mdThemingProvider.definePalette('rosePink', roseCupcake);
			$mdThemingProvider.definePalette('myBrown', oceanPearlRose);
  
			$mdThemingProvider.theme('RosePink')
			.primaryPalette('rosePink', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('myBrown', {
				'default': '200'
			})
			.warnPalette('rosePink', {
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

			$mdThemingProvider.definePalette('puffyPurple', puffyPurplePigs);
			$mdThemingProvider.definePalette('notBrown', softWhite);

			$mdThemingProvider.theme('Purple')
			.primaryPalette('puffyPurple', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('notBrown', {
				'default': '200'
			})
			.warnPalette('puffyPurple', {
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

			$mdThemingProvider.definePalette('showerBlue', babyShowerBenjamin);
			$mdThemingProvider.definePalette('showerBrown', her);

			$mdThemingProvider.theme('BabyBlue')
			.primaryPalette('showerBlue', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('showerBrown', {
				'default': '100'
			})
			.warnPalette('showerBlue', {
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

			$mdThemingProvider.definePalette('camoGreen', watchYourTone);
			$mdThemingProvider.definePalette('altCamoGreen', slurringYourSpeech);
    	
			$mdThemingProvider.theme('CamoGreen')
			.primaryPalette('camoGreen', {
				'default': '500',
				'hue-1': '200',
				'hue-2': '600'
			})
			.accentPalette('altCamoGreen', {
				'default': '200'
			})
			.warnPalette('camoGreen', {
				'default': '900'
			})
		});	

		angular.module("app")
		.config(function($mdThemingProvider) {

			var nursePalette = $mdThemingProvider.extendPalette('red', {
				'900': '060102',
				'600': '68041A',
				'500': 'A41031',
				'200': '9D999A'
			});
			var nursePaletteTwo = $mdThemingProvider.extendPalette('grey', {
				'200': 'D2CDCE'
			});

			$mdThemingProvider.definePalette('nurseRed', nursePalette);
			$mdThemingProvider.definePalette('nurseGrey', nursePaletteTwo);
    	
			$mdThemingProvider.theme('nurseViews')
			.primaryPalette('nurseRed', {
				'default': '500',
				'hue-1': '600',
				'hue-2': '200'
			})
			.accentPalette('nurseGrey', {
				'default': '500'
			})
			.warnPalette('nurseRed', {
				'default': '900'
			})
		});	

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

			$mdThemingProvider.definePalette('myGreen', soRealItsScary);
			$mdThemingProvider.definePalette('myPink', pink3);
  			
			$mdThemingProvider.theme('Bright')
				.primaryPalette('myGreen', {
					'default': '500',
					'hue-1': '200',
					'hue-2': '600'
				})
				.accentPalette('myPink', {
					'default': '200'
				})
				.warnPalette('myGreen', {
					'default': '900'
				})
			});

		angular.module("app")
			.config(function($mdThemingProvider) {

				var mySoftPastels = $mdThemingProvider.extendPalette('green', {
				'900': 'D1F2A5',
				'600': 'FFC48C',
				'500': 'FF9F80',
				'200': 'F56991'
			});
			var honeydo = $mdThemingProvider.extendPalette('pink', {
				'200': 'EFFAB4'
			});

			$mdThemingProvider.definePalette('softGreen', mySoftPastels);
			$mdThemingProvider.definePalette('softPink', honeydo);
  			
			$mdThemingProvider.theme('SoftPastels')
				.primaryPalette('softGreen', {
					'default': '500',
					'hue-1': '200',
					'hue-2': '600'
				})
				.accentPalette('softPink', {
					'default': '200'
				})
				.warnPalette('softGreen', {
					'default': '900'
				})
			});

})();