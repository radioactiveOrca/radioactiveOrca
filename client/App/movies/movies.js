angular.module('moviedash.movies', [])

.controller('MoviesCtrl', function ($scope, $location, MovieClient, selected) {
  // Code
  //STUB: Replace with dynamic data
  $scope.selectMovie = function(index) {
    selected.setSelected($scope.movies[index]);
    $location.path('/details');
  };

  $scope.movies = MovieClient.getResults().data;
});

