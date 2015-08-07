angular.module('moviedash.details', [])

.controller('DetailsCtrl', function ($scope, selected) {
  // Code
  //STUB: Replace with dynamic code

  $scope.movie = selected.getSelected();
});

