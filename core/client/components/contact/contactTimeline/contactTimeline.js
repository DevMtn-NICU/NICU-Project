(function () {
   "use strict";

   angular.module('app')

      .controller('contactTimelineCtrl', function ($scope, $mdDialog, contactService, parentService, $state, $cookies) {

         $scope.baby = $scope.$parent.currentBaby;
         console.log($scope.baby);
         $scope.images = [];

         console.log($scope.baby);


         var userId = $cookies.getObject("userId");

         $scope.getAuthLevel = function () {
            if (!userId) {
               console.log('crappiness');
            }
            if ($scope.baby.level1.indexOf(userId) !== -1) {
               $scope.authLevel = "level1";
               return $scope.authLevel;
            } else if ($scope.baby.level2) {
               $scope.authLevel = "level2";
               return $scope.authLevel;
            } else {
               $scope.authLevel = "unauthorized";
            }
         };
         $scope.getAuthLevel();


         function getCurrentBaby() {
            var babyId = parentService.sendBabyId();
            if (babyId) {
               parentService.getBabyById(babyId)
                  .then(function (baby) {
                     $scope.baby = baby;
                     $scope.getAuthLevel();
                     $scope.notes = baby.notes;
                     $scope.comments = baby.comments;
                     $scope.$broadcast('babyChanged');
                  });

               return $scope.baby, $scope.notes;
            }
         }
         getCurrentBaby();


         $scope.imageModal = function (myImage) {
            $mdDialog.show({
               templateUrl: 'components/image-slider/slider.html',
               locals: {
                  image: myImage
               },
               controller: 'sliderCtrl',
               clickOutsideToClose: true
            });

         };


         $scope.$on('babyChanged', function (e) {
            if ($scope.$parent.currentBaby) {
               $scope.baby = $scope.$parent.currentBaby;
               $scope.getAuthLevel();
               $scope.images = [];
               for (var j = 0; j < $scope.baby.notes.length; j++) { //date parsing
                  $scope.baby.notes[j].created_at = new Date($scope.baby.notes[j].created_at).toLocaleString();
                  if ($scope.baby.notes[j].picturesUrl) {
                     $scope.images.push($scope.baby.notes[j].picturesUrl);
                  }
               }
               $scope.numberOfImages = $scope.images.length;
               (function configureChartData() {
                  $scope.data.data = [];
                  for (var i = ($scope.baby.notes.length - 1); i > ($scope.baby.notes.length - 6); i--) {
                     var note = $scope.baby.notes[i];
                     if (note.stats) {
                        if (note.stats.oxygen) {
                           $scope.data.data.unshift({
                              x: new Date(note.created_at).toLocaleTimeString(),
                              y: [note.stats.heartRate, note.stats.oxygen]
                           });
                        }
                        if (note.stats.weight) {
                           $scope.wtData.data.unshift({
                              x: new Date(note.created_at).toLocaleTimeString(),
                              y: [parseInt(note.stats.weight)]
                           });
                        }
                     }
                  }
               }());
            }
         });

         $scope.config = {
            title: 'Stats Over Time', // chart title. If this is false, no title element will be created.
            tooltips: true,
            labels: false, // labels on data points
            // exposed events
            mouseover: function () {},
            mouseout: function () {},
            click: function () {},
            // legend config
            legend: {
               display: true, // can be either 'left' or 'right'.
               position: 'right',
               // you can have html in series name
               htmlEnabled: false
            },
            // override this array if you're not happy with default colors
            colors: ['red', 'blue'],
            lineLegend: 'lineEnd', // Only on line Charts
            lineCurveType: 'monotone', // change this as per d3 guidelines to avoid smoothline
            isAnimate: true, // run animations while rendering chart
            yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
            xAxisMaxTicks: 5, // Optional: maximum number of X axis ticks to show if data points exceed this number
            waitForHeightAndWidth: false // if true, it will not throw an error when the height or width are not defined (e.g. while creating a modal form), and it will be keep  watching for valid height and width values
         };
         
         $scope.data = {
            series: ["Heart Rate", "Oxygen(%)"],
            data: [] //being populated by the function on baby select
         };

         //This is the weight graph config stuff
         $scope.wtConfig = {
            title: 'Weight', // chart title. If this is false, no title element will be created.
            tooltips: true,
            labels: false, // labels on data points
            // exposed events
            mouseover: function () {},
            mouseout: function () {},
            click: function () {},
            // legend config
            legend: {
               display: true, // can be either 'left' or 'right'.
               position: 'right',
               // you can have html in series name
               htmlEnabled: false
            },
            // override this array if you're not happy with default colors
            colors: ['orange', 'blue'],
            lineLegend: 'lineEnd', // Only on line Charts
            lineCurveType: 'monotone', // change this as per d3 guidelines to avoid smoothline
            isAnimate: true, // run animations while rendering chart
            yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
            xAxisMaxTicks: 5, // Optional: maximum number of X axis ticks to show if data points exceed this number
            waitForHeightAndWidth: false // if true, it will not throw an error when the height or width are not defined (e.g. while creating a modal form), and it will be keep watching for valid height and width values
         };

         $scope.wtData = {
            series: ["Weight(g)"],
            data: [] //being populated by the function on baby select
         };

         console.log($scope.baby);

      });
}())
