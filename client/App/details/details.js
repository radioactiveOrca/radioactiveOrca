angular.module('moviedash.details', [])

.controller('DetailsCtrl', function ($scope, selected) {
  // Code

  $scope.movie = selected.getSelected();


  // Navigation info
  $scope.origin = selected.getLocation();
  $scope.destination = $scope.movie.theaterAddress;
  $scope.travelMode = selected.getModality() ? selected.getModality().toUpperCase() : 'DRIVING';

});