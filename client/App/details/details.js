angular.module('moviedash.details', [])

.controller('DetailsCtrl', function ($scope, selected) {
  // Code

  $scope.movie = selected.getStorage('movie');

  // Navigation info
  $scope.origin = selected.getStorage('location');
  $scope.destination = $scope.movie.theaterAddress;
  $scope.travelMode = selected.getStorage('modality') ? selected.getStorage('modality').toUpperCase() : 'DRIVING';

});