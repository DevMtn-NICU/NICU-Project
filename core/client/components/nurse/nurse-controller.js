(function () {
    "use strict";

    angular.module('app')
        .controller('nurseController', function ($scope, $stateParams) {


        $scope.notes = {};
        $scope.notes.stats = {};

        $scope.addBabyNote = function() {
		nurseService.addBabyNote().
		then(function(response) {


        };







        });


} ());
