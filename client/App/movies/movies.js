angular.module('moviedash.movies', ['ui.bootstrap'])

.controller('MoviesCtrl', function ($scope, $location, MovieClient, selected, $modal) {
  // Code
  //STUB: Replace with dynamic data

  $scope.selectMovie = function(index) {
    selected.setStorage('movie', $scope.movies[index]);
    $location.path('/details');
  };

  // $scope.selectMovie = function(index) {
  //   selected.setSelected($scope.movies[index]);
  //   $location.path('/details');
  // };


  $scope.movies = MovieClient.getResults().data;

  $scope.showTrailer = function(index) {
    var link = $scope.movies[index].trailerLink;
    var videoId = link.slice(link.indexOf('=') + 1);
    var embededUrl = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1';
    
    $scope.title = $scope.movies[index].movieName;

    //$scope.movies[index].trailerLink
    // Need to update the template using this link and change the link to embeded
    $modal.open({
      templateUrl: "../App/movies/videoplayer.html",
      controller: 'MoviesCtrl',
      size: "lg"
    })
  }

  $scope.closeTrailer = function() {
    $modal.close();
  }
  
});

