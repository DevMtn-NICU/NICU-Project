(function () {
      "use strict";

      angular.module('app')
            .controller('parentViewCtrl', function ($scope, parentService, $stateParams, $state) {

                  console.log('parentViewCtrl');
                  console.log('state params', $stateParams.user);

                  var user = $stateParams.user;
                  var baby = testUser.parent.babies[1];
                  console.log('baby', baby);

                  var getBaby = function () {
                        parentService.getBabyById(baby)
                              .then(function (response) {
                                    console.log('response', response);
                                    return $scope.baby = response;
                              });
                        return $scope.baby;
                  } ();
            })


      var testUser = {
            __v: 0,
            _id: "55f882ed9f20e18029a3a831",
            created_at: "2015-09-15T20:43:25.282Z",
            email: "dontDeleteMeEver@gmail.com",
            name: "test",
            parent: {
                  access: "parent",
                  babies: [
                        "55f882ec9f20e18029a3a830",
                        "55f883299f20e18029a3a833"
                  ]
            },

      };


} ());
