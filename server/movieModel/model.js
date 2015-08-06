var mongoose = require('mongoose');

var Movie = new mongoose.Schema({
  title: String,
  urlPoster: String,
  synposis: String
})

module.exports = mongoose.model('movie', Movie);