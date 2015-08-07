angular.module('moviedash.details', [])

.controller('DetailsCtrl', function ($scope, selected) {
  // Code
  //STUB: Replace with dynamic code
  $scope.movie = selected.getSelected();

  $scope.origin = '37.783529,-122.408553';
  $scope.destination = '37,-121.1';

});

