var googleapi = require('./googleapi');

var appendTransitTimes = function(origin, theaters, callback) {
  var destinations = theaters.map(function(theater) {
    return theater.address;
  });

  // create params with our options
  var params = {
    origins: origin,
    destinations: destinations
  };
  // query with params
  googleapi.query(params, function(googleResults) {

    // add transit times to each theater
    theaters.forEach(function(theater, index) {
      // googleapi should return results in the same order
      theater.transitTime = googleResults.rows[0].elements[index].duration.text;
    });

    callback(theaters);
  });

};

module.exports = appendTransitTimes;