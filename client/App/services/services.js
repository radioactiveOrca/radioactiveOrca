var app = angular.module('moviedash.services', []);

app.factory('MovieClient', function($http) {
  var movieInfo;
  var setResults = function(results) {
    movieInfo = results;
  };
  var getResults = function() {
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
  var selected = {};
  selected.movie = null;
  return selected;
});