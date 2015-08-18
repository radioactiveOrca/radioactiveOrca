/**
 * A module that appends the transit time to a list of theaters
 * @module appendTransitTimes
*/

var googleapi = require('./googleAPI');

/**
 * Appends the transit time to a list of theaters
 * @param {object} query - query object containing info to pass to google's distance matrix api
 * @param {array} theaters - list of theaters
 * @param {queryCallback} - The callback that handles the mutated theaters object
*/
var appendTransitTimes = function(query, theaters, callback) {
  var destinations = theaters.map(function(theater) {
    return theater.address;
  });

  // create params with our options
  var params = {
    origin: query.location,
    destinations: destinations,
    mode: query.modality,
    departure_time: query.leavingTime // sent as milliseconds
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
    /**
     * @callback queryCallback
     * @param {list} theaters - list of theaters with appended transit times
    */
  });

};

module.exports = appendTransitTimes;