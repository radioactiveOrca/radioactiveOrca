angular.module('moviedash.movies', [])

.controller('MoviesCtrl', ['$scope', '$location', 'MovieClient', 'selected', '$modal', '$sce',
  function ($scope, $location, MovieClient, selected, $modal, $sce) {
  // Code
  //STUB: Replace with dynamic data


  $scope.selectMovie = function(index) {
    selected.setStorage('movie', $scope.movies[index]);
    $location.path('/details');
  };

  $scope.movies = MovieClient.getResults().data;

  $scope.showTrailer = function(index) {

    var link = $scope.movies[index].trailerLink;

    if (link !== false) {
      var videoId = link.slice(link.indexOf('=') + 1);
      var embededUrl = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1';

      $scope.title = $scope.movies[index].movieName;
      $scope.trailerUrl = $sce.trustAsResourceUrl(embededUrl);

      $scope.$modalInstance = $modal.open({
        templateUrl: "../App/movies/videoplayer.html",
        controller: 'MoviesCtrl',
        size: "lg",
        scope: $scope
      });
    }
  };

  $scope.closeTrailer = function() {
    $scope.$modalInstance.close('');

  };

  $scope.getLeaveTime = function() {
    var leaveTime = new Date(selected.getStorage('leavingTime'));
    var hours = leaveTime.getHours() % 12 || 12;
    var minutes = leaveTime.getMinutes(); 
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }
    return hours.toString() + ":" + minutes;
  }  
}]);

