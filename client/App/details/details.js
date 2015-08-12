angular.module('moviedash.details', [])

.controller('DetailsCtrl', ['$scope', 'selected', function ($scope, selected) {
  // Code

  $scope.movie = selected.getStorage('movie');


  // Navigation info
  $scope.origin = selected.getStorage('location');
  $scope.destination = $scope.movie.theaterAddress;
  $scope.travelMode = selected.getStorage('modality') ? selected.getStorage('modality').toUpperCase() : 'DRIVING';
  $scope.departure_time = $scope.travelMode === 'TRANSIT' ?
                          new Date(parseInt(selected.getStorage('leavingTime'))) :
                          new Date(); // default to now

  $scope.transit_options = {departureTime: $scope.departure_time};
}]);