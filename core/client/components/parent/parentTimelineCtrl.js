(function () {
  "use strict";

  angular.module('app')
    .controller('parentTimelineCtrl', function ($scope, parentService, $stateParams) {

      $scope.baby = $scope.$parent.baby;

      $scope.config = {
        title: 'Stats Over Time', // chart title. If this is false, no title element will be created.
        tooltips: true,
        labels: true, // labels on data points
        // exposed events
        mouseover: function () { },
        mouseout: function () { },
        click: function () { },
        // legend config
        legend: {
          display: true, // can be either 'left' or 'right'.
          position: 'left',
          // you can have html in series name
          htmlEnabled: false
        },
        // override this array if you're not happy with default colors
        colors: [],
        lineLegend: 'lineEnd', // Only on line Charts
        lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
        isAnimate: true, // run animations while rendering chart
        yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
        xAxisMaxTicks: 7, // Optional: maximum number of X axis ticks to show if data points exceed this number
        waitForHeightAndWidth: false // if true, it will not throw an error when the height or width are not defined (e.g. while creating a modal form), and it will be keep watching for valid height and width values
      };

      $scope.acData = {
        series: ["Heart Rate", "Oxygen"],
        data: []  //being populated by the function below
      };

      (function configureChartData () {
        for (var i = 0; i < 5; i++) {
          var note = $scope.baby.notes[i];
          $scope.acData.data.push({
            x: note.created_at,
            y: [note.stats.heartRate, note.stats.oxygen]
          });
        }
        console.log($scope.acData.data);
      }());

    })
} ());
