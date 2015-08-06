var showtimes = require('showtimes');


// function to enter lng & lat into showtimes parameter


// Need to see if longitude & latitude is one argument?
exports.getShows = function(location) {

  var s = showtimes(location, {});
  s.getTheaters(function(err, theaters) {
    // Should return an array of theaters
    console.log(theaters)
    return theaters;
  });
};

