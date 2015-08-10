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