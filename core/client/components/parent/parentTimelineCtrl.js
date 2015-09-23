(function () {
   "use strict";

   angular.module('app')
      .controller('parentTimelineCtrl', function ($scope, parentService, $mdDialog, $cookies, $rootScope) {

         $scope.baby = {};

         function getCurrentBaby() {
            var babyId = parentService.sendBabyId();
            if (babyId) {
               parentService.getBabyById(babyId)
                  .then(function (baby) {
                     $scope.baby = baby;
                     $scope.notes = baby.notes;
                     $scope.$broadcast('babyChanged');
                  })
               return $scope.baby, $scope.notes;
            }
            console.log('getCurrentBaby failed');
         }
         getCurrentBaby();



         $scope.$on('babyChanged', function (e) {
            if ($scope.$parent.currentBaby) {
               $scope.baby = $scope.$parent.currentBaby;
               console.log($scope.baby);
               for (var j = 0; j < $scope.baby.notes.length; j++) { //date parsing
                  $scope.baby.notes[j].created_at = new Date($scope.baby.notes[j].created_at).toLocaleString();
                  console.log($scope.baby.notes);
               }
               (function configureChartData() {
                  $scope.data.data = [];
                  console.log($scope.baby.notes.length);
                  for (var i = ($scope.baby.notes.length - 1); i > ($scope.baby.notes.length - 6); i--) {
                     console.log(i);
                     var note = $scope.baby.notes[i];
                     $scope.data.data.unshift({
                        x: new Date(note.created_at).toLocaleTimeString(),
                        y: [note.stats.heartRate, note.stats.oxygen]
                     });
                     console.log($scope.data.data);
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
            waitForHeightAndWidth: false // if true, it will not throw an error when the height or width are not defined (e.g. while creating a modal form), and it will be keep watching for valid height and width values
         };

         $scope.data = {
            series: ["Heart Rate", "Oxygen(%)"],
            data: [] //being populated by the function on baby select
         };

         console.log($scope.baby);

      })
}());

// ZOMBIE CODE TO WORK ON LATER PERHAPS
// for (var i = ($scope.baby.notes.length - 1); i > ($scope.baby.notes.length - 6); i--) {
//               console.log(i);
//               var note = $scope.baby.notes[i];
//               if (i === $scope.baby.notes.length - 1 || i === $scope.baby.notes.length - 5) {
//                 $scope.data.data.unshift({
//                   x: new Date(note.created_at).toLocaleTimeString(),
//                   y: [note.stats.heartRate, note.stats.oxygen]
//                 });
//               }
//               $scope.data.data.unshift({
//                   x: " ",
//                   y: [note.stats.heartRate, note.stats.oxygen]
//                 });
//             }
