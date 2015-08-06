var packer = require
module.exports = function(theaters) {
  /* movieFilter takes a data structure containing theater information in the following format:
  [theater]
    L> google maps data about theater
      L> time to drive to theater
      L> directions to theater
    L> movies playing at theater
      L> showtimes for that movie

  It returns a list of objects like this:
  [
    { showTime:             ...
      movieName:            ...
      theaterName:          ...
      transitTime:          ...
    },
    { showTime:             ...
      movieName:            ...
      theaterName:          ...
      transitTime:          ...
    },
    ...
    ...
  ]
  */
  var results = [];
  //for each theater
    //capture transitTime
    //add currentTime to transitTime
    //theater.movies
      //for each movie
        //movie.showtimes
          //for each showtime
            //check if within time frame
              //if yes
                //create a new object
var createObject = function(theaters) {
    var results = [];
    theaters.forEach(function(theater) {
        console.log(theater.name)
        var transitTime = parseInt(theater.transitTime)  * 60000;
        console.log(transitTime)
        var targetTime = new Date(new Date().getTime() + transitTime).toTimeString().split(/\D/).slice(0,2);
        if (targetTime[0] > 12) {
            targetTime[0] = targetTime[0] - 12;
        }
        console.log(targetTime)
       theater.movies.forEach(function(movie) {
           console.log(movie.name)
           movie.showtimes.forEach(function(showtime) {
               var showTime = showtime.split(/\D/);
               console.log(showTime)
               if (+showTime[0] >= +targetTime[0] 
               && +showTime[0] <= +targetTime[0] + 1 
               && +showTime[1] >= +targetTime[0] + 5
               && +showTime[1] <= +targetTime[1] + 35) { 
                   console.log({showTime: showtime, movieName: movie.name, transitTime: theater.transitTime, theaterName: theater.name})
                   results.push({showTime: showtime, movieName: movie.name, transitTime: theater.transitTime, theaterName: theater.name}) }
           })
       }) 
    });
    return results;
}
                



  return results;

}