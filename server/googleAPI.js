var qs = require('querystring');
var request = require('request');

if(!process.env.PORT) {
  var secret = require('./googleKey');
}

var DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

var DistanceMatrix = function() {
  // constructor
};


var format = function(params) {
  /*query reference:
    https://developers.google.com/maps/documentation/distancematrix/intro
  */

  var query = {};
  query.key = process.env.GOOGLEKEY || secret.google;
  query.origins = params.origins.replace(/[\s]/g, ''); // get rid of spaces
  query.destinations = params.destinations.join('|');
  query.mode = params.mode.toLowerCase();
  query.departure_time = (query.mode === 'transit') ?
                          // convert departure time to seconds since January 1, 1970 UTC
                         Math.round(((new Date()).getTime() + params.departure_time) / 1000) :
                          // departure_time is 'now' if travel mode is not transit
                         query.departure_time = 'now';

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
