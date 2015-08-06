var showtimes = require('showtimes');
var q = require('q');


// function to enter lng & lat into showtimes parameter


// Need to see if longitude & latitude is one argument?
exports.getShows = function(location) {

  var s = showtimes(location, {pageLimit: 1});
  s.getTheaters(function(err, theaters) {
    // Should return an array of theaters
    console.log(theaters);
    return theaters;
  });
};

