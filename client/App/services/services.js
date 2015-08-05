var app = angular.module('moviedash.services', []);

app.factory('MovieClient', function($http) {
  var results;
  var getTheaters = function(location) {
    return $http({
      method: 'POST',
      data: location,
      url: '/api/movies',
      success: function(response) {
         results = response;
      },
      error: function(err){
        console.log(err);
      }
    });
  };
  return {
    getTheaters: getTheaters,
    results: results
  };
});