angular.module('moviedash.details', [])

.controller('DetailsCtrl', function ($scope) {
  // Code
  //STUB: Replace with dynamic code
  $scope.movie = {
    theater: "Theater: Kabuki Theater 9",
    commute: "Commute Time: 12 minutes",
    time: "Playing at: 10:25pm (18 minutes from now)",
    score: "RottenTomatoes score: 99%",
    synopsis: "Wayne is still living at home. He has a world class collection of name tags from jobs he's tried, but he does have his own public access TV show. A local station decides to hire him and his sidekick, Garth, to do their show professionally and Wayne & Garth find that it is no longer the same. Wayne falls for a bass guitarist and uses his and Garth's Video contacts to help her career along, knowing that Ben Oliver, the sleazy advertising guy who is ruining their show will probably take her away from him if they fail.",
    image: "../../assets/waynesworld2.jpg"
  }
});

