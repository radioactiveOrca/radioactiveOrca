var app = angular.module('moviedash.landing', []);

app.controller('LandingCtrl', function($scope, $location, MovieClient) {

  //Checks if geolocation is available, shows form if not
  $scope.findLocation = function() {
    $scope.isLoading = true;
    if (!navigator.geolocation) {
      $scope.error= "Geolocation is not supported by your browser. Please enter your zipcode.";
    }

    function success(position) {
      $scope.isLoading = false;
      //if location is found, sets lat and long
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      $scope.location = latitude + ', ' + longitude;
      //sends location to factory
      MovieClient.getTheaters($scope.location).then(function(response) {
        //redirects to movie route
        MovieClient.setResults(response);
        $location.path('/movies');
      });
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
    console.log("clicked!");
    $scope.isLoading = true;
    MovieClient.getTheaters($scope.zip).then(function(response) {
      $scope.isLoading = false;
      MovieClient.setResults(response);
      $location.path('/movies');
    });
  };
});