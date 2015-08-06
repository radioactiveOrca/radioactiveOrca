//Server-side JS
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var url = require('url-parse');

var port = process.env.PORT || 8080; 

var app = express();


app.use(express.static('../client'));

app.get('/', function(req, res) {
  res.send("SITE IS UP");
})

app.listen(port, function() {
  console.log('Listening at localhost:8080')
});