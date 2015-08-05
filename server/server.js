//Server-side JS
var express = require('express');
var request = require('request');

var app = express();


app.get('/', function(req, res) {
  res.send("SITE IS UP");
})

app.listen(8000, function() {
  console.log('Listening at localhost:3000')
});