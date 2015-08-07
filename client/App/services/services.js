var app = angular.module('moviedash.services', []);

app.factory('MovieClient', function($http) {
  var setResults = function(results) {
    sessionStorage.movieInfo = angular.toJson(results);
  };
  var getResults = function() {
    var movieInfo = angular.fromJson(sessionStorage.movieInfo);
    return movieInfo;
  };
  var getTheaters = function(location) {
    return $http({
      method: 'POST',
      data: {location: location},
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
  var setSelected = function(movie) {
    console.log(movie)
    sessionStorage.movie = angular.toJson(movie);
  };
  var getSelected = function() {
    var movie = angular.fromJson(sessionStorage.movie);
    return movie;
  };
  return {
    setSelected: setSelected,
    getSelected: getSelected
  };
});