angular.module('moviedash.details', [])

.controller('DetailsCtrl', function ($scope, selected) {
  // Code

  $scope.movie = selected.getSelected();


  // Navigation info
  $scope.origin = '37.783529,-122.408553';
  $scope.destination = $scope.movie.theaterAddress;

});

