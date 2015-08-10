var googleapi = require('./googleapi');

var appendTransitTimes = function(query, theaters, callback) {
  var destinations = theaters.map(function(theater) {
    return theater.address;
  });

  console.log(query);
  // create params with our options
  var params = {
    origins: query.location,
    destinations: destinations,
    mode: query.modality
  };
  // query with params
  googleapi.query(params, function(googleResults) {

    // add transit times to each theater
    theaters.forEach(function(theater, index) {
      var result = googleResults.rows[0].elements[index];
      // googleapi should return results in the same order
      theater.transitTime = result.duration.text;
      theater.transitTimeSeconds = result.duration.value; // time in seconds
    });

    callback(theaters);
  });

};

module.exports = appendTransitTimes;