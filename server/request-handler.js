var showtimes = require('showtimes');
var q = require('q');
var appendTransitTime= require('./appendTransitTime');


// function to enter lng & lat into showtimes parameter


// Need to see if longitude & latitude is one argument?
exports.getShows = function(req,res) {

  var s = showtimes(req.body.location, {pageLimit: 1});
  s.getTheaters(function(err, theaters) {
    // Should return an array of theaters
    console.log(theaters);
    appendTransitTime(req.body.location, theaters, function(results) {
      console.log(results);
      res.status(200).send(theaters);
    });
  });
};

