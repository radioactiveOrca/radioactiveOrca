var movie = require('./model.js');
var Q = require('q');

module.exports = {

  // TODO: create add movie function
  addMovie: function(imdbData, id) {
    // var createMovie = Q.nbind(movie.create, movie);
    // var findMovie = Q.nbind(movie.findOne, movie);
    
    // Checks if the movie exists and if it does
    // Sends the movie up to packer

    var newMovie = new movie({
      _id: id,
      title: imdbData.title,
      poster: imdbData.poster,
      synopsis: imdbData.synopsis
    });
    newMovie.save(function(err, movie) {
      if (err) {
        console.log(err);
      }
      return movie;
    });

  },
  findMovie: function(id, callback) {
    movie.findOne({_id: id})
    .exec(function(err, match) {
      if(err) {
        console.log(err);
        callback(null);
      } else if(match) {
        callback(match);
      } else {
        callback(null);
      }
    });
  }
};

