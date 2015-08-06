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
var calculateTarget = function(transit) {
  var currentTime = new Date();
  return currentTime.setMinutes(currentTime.getMinutes + transit);
};

var convertShowTime = function(showtime) {
  var today = new Date();
  var timeArray = showtime.split(/\D/);
  if (showtime.indexOf('pm') !== -1 && +timeArray[0] !== 12) {
    +timeArray[0] + 12;
  }
  today.setHours(+timeArray[0]);
  today.setMinutes(+timeArray[1]);
  return today;
};
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
    console.log(theater.name);
    var transitTime = parseInt(theater.transitTime);
    console.log(transitTime);
    var targetTime = calculateTarget(transitTime);
    console.log(targetTime);
    theater.movies.forEach(function(movie) {
      console.log(movie.name)
      movie.showtimes.forEach(function(showtime) {
        var min = convertShowTime(showtime);
        var max = convertShowTime(showtime);
        min = min.setMinutes(min.getMinutes + 5);
        max = max.setMinutes(max.getMinutes + 35);

      if (min <= targetTime && max >= targetTime){ 
        console.log({showTime: showtime, movieName: movie.name, transitTime: theater.transitTime, theaterName: theater.name})
        results.push({showTime: showtime, movieName: movie.name, transitTime: theater.transitTime, theaterName: theater.name}) }
      })
    }) 
  });
  return results;
}
                

