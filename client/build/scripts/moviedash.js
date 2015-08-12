angular.module('moviedash', [
  'moviedash.landing',
  'moviedash.movies',
  'moviedash.details',
  'moviedash.services',
  'ui.router',
  'ngMap',
  'ui.bootstrap'
  //'ngMock'

])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/landing");

  $stateProvider
    .state('landing', {
      url : '/landing',
      controller: 'LandingCtrl',
      templateUrl: 'app/landing/landing.html'
    })
    .state('movies', {
      url : '/movies',
      controller: 'MoviesCtrl',
      templateUrl: 'app/movies/movies.html'
    })
    .state('details', {
      url: '/details',
      controller: 'DetailsCtrl',
      templateUrl: 'app/details/details.html'
    });
});

angular.module('moviedash.details', [])

.controller('DetailsCtrl', function ($scope, selected) {
  // Code

  $scope.movie = selected.getStorage('movie');


  // Navigation info
  $scope.origin = selected.getStorage('location');
  $scope.destination = $scope.movie.theaterAddress;
  $scope.travelMode = selected.getStorage('modality') ? selected.getStorage('modality').toUpperCase() : 'DRIVING';
  $scope.departure_time = $scope.travelMode === 'TRANSIT' ?
                          new Date(new Date().getTime() + parseInt(selected.getStorage('leavingTime'))) :
                          new Date(); // default to now

  $scope.transit_options = {departureTime: $scope.departure_time};
});
var app = angular.module('moviedash.landing', []);

app.controller('LandingCtrl', function($scope, $location, MovieClient, $http) {
  $scope.modality = "driving";
  $scope.leavingTime = "0";
  
  //Checks if geolocation is available, shows form if not
  $scope.findLocation = function() {
    $scope.error = null;
    $scope.isLoading = true;
    if (!navigator.geolocation) {
      $scope.error= "Geolocation is not supported by your browser. Please enter your zipcode.";
    }

    function success(position) {
      $scope.isLoading = false;
      //if location is found, sets lat and long
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      sendQuery(latitude, longitude);
    }

    function error() {
      $scope.isLoading = false;
      //on error, shows input form
      $scope.error = "Unable to retrieve location. Please enter your zipcode.";
    }

    //calls for geolocation on button click
    navigator.geolocation.getCurrentPosition(success, error);
  };

  //handles submit from form and sends zip to factory
  $scope.zipSubmit = function() {
    $scope.isLoading = true;
    $scope.error = null;
    $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.zip).then(function (response) {
      var lat = response.data.results[0].geometry.location.lat;
      var long = response.data.results[0].geometry.location.lng;
      sendQuery(lat, long);
    });
  };

  var sendQuery = function(lat, long) {
    $scope.location = lat + ', ' + long;
    $scope.query = {location: $scope.location, modality : $scope.modality, leavingTime: $scope.leavingTime};
    MovieClient.getTheaters($scope.query).then(function(response) {
      handleResults(response);
    });
  };


  var handleResults = function(response) {
    $scope.isLoading = false;
    if (!response.data) {
      $scope.error = "No movies are available at this time. Please try again later.";
      return;
    } else {
      MovieClient.setResults(response);
      $location.path('/movies');          
    }
  };
});
angular.module('moviedash.movies', [])

.controller('MoviesCtrl', function ($scope, $location, MovieClient, selected, $modal, $sce) {
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
      })
    }
  }

  $scope.closeTrailer = function() {
    $scope.$modalInstance.close('');
  }
  
});


var app = angular.module('moviedash.services', []);

app.factory('MovieClient', function($http, selected) {
  var setResults = function(results) {
    selected.setStorage('movieInfo', results);
  };
  var getResults = function() {
    return selected.getStorage('movieInfo');
  };
  var getTheaters = function(query) {
    selected.setStorage('location', query.location);
    selected.setStorage('modality', query.modality);
    selected.setStorage('leavingTime', query.leavingTime);
    return $http({
      method: 'POST',
      data: query,
      url: '/api/movies',
      success: function(response) {
         return response;
      },
      error: function(err){
        console.log(err);
      }
    });
  };
  return {
    getTheaters: getTheaters,
    setResults: setResults,
    getResults: getResults
  };
});

app.factory('selected', function() {

  var setStorage = function(key, value) {
    sessionStorage[key] = angular.toJson(value);
  };
  var getStorage = function(key) {
    return angular.fromJson(sessionStorage[key]);
  };
  return {
    setStorage: setStorage,
    getStorage: getStorage
  };
});

//This filter is meant to be used on a javascript Date object. It
//replaces the date object with a string describing that time in relative
//terms like "5 minutes from now"
app.filter('timeFromNow', function() {
  return function(input) {
    var delta = Math.round((input - new Date()) / 1000);
    if (delta < 0) {
      return "Expired"
    }
    var minutes = Math.round(delta / 60);
    return minutes.toString() + " minutes from now";
  };
});


