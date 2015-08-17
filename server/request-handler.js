var showtimes = require('showtimes');
var q = require('q');
var appendTransitTime= require('./appendTransitTime');
var filter = require('./movieFilter');
var packer = require('./packer');
// var tzwhere = require('tzwhere');
// tzwhere.init();


// function to enter lng & lat into showtimes parameter


// Need to see if longitude & latitude is one argument?
exports.getShows = function(req,res) {
  var loc = req.body.location;

  var s = showtimes(loc, {pageLimit: 1});
  s.getTheaters(function(err, theaters) {
    if (!theaters) {
      res.send(null);
      return;
    }
    // send req.body (has loc and modality info) to distance matrix
    appendTransitTime(req.body, theaters, function(results) {
      //filter movies for correct times
      // var locArray = loc.split(',');
      // console.log(tzwhere.tzOffsetAt(37.783771, -122.40920990000001))
      // var offset = tzwhere.tzOffsetAt(parseFloat(locArray[0]) , parseFloat(locArray[1]));
      var filteredResults = filter(results, req.body.leavingTime);
      if (filteredResults.length === 0) {
        res.send(null);
        return;
      }

      // pack info to send back to client
      packer(filteredResults, function(movies) {
        res.status(200).send(movies);
      });

    });
  });
};

