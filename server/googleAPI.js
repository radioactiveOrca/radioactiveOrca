var qs = require('querystring');
var request = require('request');
var secret = require('./googleKey');

var DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

var DistanceMatrix = function() {
  // constructor
};


var format = function(params) {
  /* params looks like
    {
      // required
        // origins (we're only expecting one)
        // destinations (could be multiple)
      // optional
        // mode (default, walking, bicycling, transit)
        // transit_mode (for if mode is transit)
        // departure_time
      origin: ..., (string that is zip or lat,long)
      destinations: [...]
    }
  */

  var query = {};
  query.key = secret;
  query.origins = params.origins.replace(/[\s]/g, ''); // get rid of spaces
  query.destinations = params.destinations.join('|');
  return qs.stringify(query);
};

DistanceMatrix.prototype.query = function(params, callback) {
  var querystring = format(params);
  request(DISTANCE_API_URL + querystring, function(err, response, body) {
    if (err) {
      return console.error (err);
    }
    callback(JSON.parse(body));
  });
};

module.exports = new DistanceMatrix();
