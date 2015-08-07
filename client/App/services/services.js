var app = angular.module('moviedash.services', []);

app.factory('MovieClient', function($http, selected) {
  var setResults = function(results) {
    sessionStorage.movieInfo = angular.toJson(results);
  };
  var getResults = function() {
    var movieInfo = angular.fromJson(sessionStorage.movieInfo);
    return movieInfo;
  };
  var getTheaters = function(query) {
    selected.setLocation(query.location);
    selected.setModality(query.modality);
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
  var setSelected = function(movie) {
    sessionStorage.movie = angular.toJson(movie);
  };
  var getSelected = function() {
    var movie = angular.fromJson(sessionStorage.movie);
    return movie;
  };
  var setLocation = function(location) {
    sessionStorage.clientLocation = angular.toJson(location);
  };
  var getLocation = function() {
    var loc = angular.fromJson(sessionStorage.clientLocation);
    return loc;
  };
  var setModality = function(modality) {
    sessionStorage.modality = angular.toJson(modality);
  };
  var getModality = function() {
    var modality = angular.fromJson(sessionStorage.modality);
    return modality;
  };
  return {
    setSelected: setSelected,
    getSelected: getSelected,
    setLocation: setLocation,
    getLocation: getLocation,
    setModality: setModality,
    getModality: getModality
  };
});