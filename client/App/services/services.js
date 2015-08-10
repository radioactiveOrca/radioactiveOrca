var app = angular.module('moviedash.services', []);

app.factory('MovieClient', function($http, selected) {
  var setResults = function(results) {
    selected.setStorage('movieInfo', results);
  };
  var getResults = function() {
<<<<<<< HEAD
    return selected.getStorage('movieInfo');
=======
    var movieInfo = angular.fromJson(sessionStorage.movieInfo);
    console.log(movieInfo)
    return movieInfo;
>>>>>>> Added videoplay template, show trailer btn, implemented partial functionality for trailers
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
    var minutes = Math.round(delta / 60);
    return minutes.toString() + " minutes from now";
  };
});


