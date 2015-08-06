//Server-side JS
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var url = require('url-parse');
var requestHandler = require('../server/request-handler');
var mongoose = require('mongoose');


var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/test');

app.use(express.static('../client'));

app.get('/', function(req, res) {
  // requestHandler.getShows(94134);
  res.send("SITE IS UP");
});

app.post('/api/movies', requestHandler.getShows);

app.listen(port, function() {
  console.log('Listening at localhost:8080');
});