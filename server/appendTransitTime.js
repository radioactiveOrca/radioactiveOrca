var googleapi = require('./googleapi');

var appendTransitTimes = function(origin, theaters, callback) {
  // input: array of theaters

  console.log("appendTransitTime.js: called");
  var destinations = theaters.map(function(theater) {
    return theater.address;
  });

  var params = {
    origins: origin,
    destinations: destinations
  };

  console.log("appendTransitTime.js: constructed params for google query");
  // query
  googleapi.query(params, function(googleResults) {
    // output: same array with times appended
    console.log("appendTransitTime.js: received results from google query");
    theaters.forEach(function(theater, index) {
      // googleapi should return results in the same order
      theater.transitTime = googleResults.rows[0].elements[index].duration.text;
    });

    callback(theaters);
  });

};


module.exports = appendTransitTimes;