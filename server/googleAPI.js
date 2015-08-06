var qs = require('querystring');
var request = require('request');
var secret = require('../googleKey');

// origins=Bobcaygeon+ON|41.43206,-81.38992
// destinations=Darling+Harbour+NSW+Australia|24+Sussex+Drive+Ottawa+ON|Capitola+CA

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
  var query = format(params);

  console.log("googleAPI.js: query string", query);
  request(DISTANCE_API_URL + query, function(err, response, body) {
    if (err) {
      return console.error (err);
    }
    callback(JSON.parse(body));
  });
};



module.exports = new DistanceMatrix();
