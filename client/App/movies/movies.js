angular.module('moviedash.movies', [])

.controller('MoviesCtrl', function ($scope, $location, selected) {
  // Code
  //STUB: Replace with dynamic data
  $scope.selectMovie = function(index) {
    selected.movie = $scope.movies[index];
    $location.path('/details');
  }

  $scope.movies = [
    {
      title: "Wayne's World",
      image: "../../Assets/WaynesWorld.jpg",
      theater: "AMC Century 30",
      commute: "10 Minute Drive",
      showtime: "Playing in 15 minutes",
      synopsis: "Wayne is still living at home. He has a world class collection of name tags from jobs he's tried, but he does have his own public access TV show. A local station decides to hire him and his sidekick, Garth, to do their show professionally and Wayne & Garth find that it is no longer the same. Wayne falls for a bass guitarist and uses his and Garth's Video contacts to help her career along, knowing that Ben Oliver, the sleazy advertising guy who is ruining their show will probably take her away from him if they fail."
    },
    {
      title: "Wayne's World 2",
      image: "../../Assets/WaynesWorld.jpg",
      theater: "AMC Century 31",
      commute: "11 Minute Drive",
      showtime: "Playing in 16 minutes",
      synopsis: "Wayne is still living at home. He has a world class collection of name tags from jobs he's tried, but he does have his own public access TV show. A local station decides to hire him and his sidekick, Garth, to do their show professionally and Wayne & Garth find that it is no longer the same. Wayne falls for a bass guitarist and uses his and Garth's Video contacts to help her career along, knowing that Ben Oliver, the sleazy advertising guy who is ruining their show will probably take her away from him if they fail."

    },
    {
      title: "Wayne's World 3",
      image: "../../Assets/WaynesWorld.jpg",
      theater: "AMC Century 32",
      commute: "12 Minute Drive",
      showtime: "Playing in 17 minutes",
      synopsis: "Wayne is still living at home. He has a world class collection of name tags from jobs he's tried, but he does have his own public access TV show. A local station decides to hire him and his sidekick, Garth, to do their show professionally and Wayne & Garth find that it is no longer the same. Wayne falls for a bass guitarist and uses his and Garth's Video contacts to help her career along, knowing that Ben Oliver, the sleazy advertising guy who is ruining their show will probably take her away from him if they fail."
      
    },
  ]
});

