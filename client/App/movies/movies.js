angular.module('moviedash.movies', [])

.controller('MoviesCtrl', function ($scope) {
  // Code
  //STUB: Replace with dynamic data
  $scope.movies = [
    {
      title: "Wayne's World",
      image: "../../Assets/WaynesWorld.jpg",
      theater: "AMC Century 30",
      commute: "10 Minute Drive",
      showtime: "Playing in 15 minutes"
    },
    {
      title: "Wayne's World 2",
      image: "../../Assets/WaynesWorld.jpg",
      theater: "AMC Century 31",
      commute: "11 Minute Drive",
      showtime: "Playing in 16 minutes"
    },
    {
      title: "Wayne's World 3",
      image: "../../Assets/WaynesWorld.jpg",
      theater: "AMC Century 32",
      commute: "12 Minute Drive",
      showtime: "Playing in 17 minutes"
    },
  ]
});

