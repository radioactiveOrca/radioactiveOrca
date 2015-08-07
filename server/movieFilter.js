

//calculates current time plus transit
var calculateTarget = function(transit) {
  var currentTime = new Date().getTime();
  return currentTime + (transit * 60000);
};

//changes showtime into date object
var convertShowTime = function(showtime) {
  var today = new Date();
  var timeArray = showtime.split(/\D/);
  //if time is in the evening
  if (showtime.indexOf('pm') !== -1 && +timeArray[0] !== 12) {
    today.setHours(+timeArray[0] + 12);
    //if time is midnight
  } else if (showtime.indexOf('am') !== -1 && +timeArray[0] === 12) {
    today.setHours(0);
    today.setDate(today.getDate() + 1);
  } else {
    today.setHours(+timeArray[0]);
  }
 
  today.setMinutes(+timeArray[1]);
  return today.getTime();
};

module.exports = function(theaters) {
  var results = [];
  theaters.forEach(function(theater) {
    var transitTime = parseInt(theater.transitTime);
    var targetTime = calculateTarget(transitTime);
    //mintime is target plus 5 minutes
    minTargetTime = targetTime + 300000;
    //maxtime is target plus 35 minutes
    maxTargetTime = targetTime + 2100000;
    theater.movies.forEach(function(movie) {
      movie.showtimes.forEach(function(showtime) {
        var showTime = convertShowTime(showtime);

        if (minTargetTime <= showTime && showTime <= maxTargetTime) {
          //extract imdb id from url
          var imdbArr = movie.imdb.split('/');
          var imdb = imdbArr[imdbArr.length - 2];
          results.push({id: imdb, showTime: showtime, movieName: movie.name, transitTime: theater.transitTime, theaterName: theater.name, imdbLink: movie.imdb, trailerLink: movie.trailer, theaterAddress: theater.address});
        }
      });
    });
  });
  return results;
};

