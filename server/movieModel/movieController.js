var movie = require('./model.js');
var Q = require('q');

module.exports = {

  // TODO: create add movie function
  addMovie: function(film) {
    var createMovie = Q.nbind(Movie.create, Movie);
    var findMovie = Q.nbind(Movie.findOne, Movie);

    // Checks if the movie exists and if it does
    // Sends the movie up to packer
    findMovie({title: film.name})
      .then(function(match){
        if (match) {
          return match;
        } else {
          // fetch the movie title, poster, synposis
          // from packer and then store it in the DB
          var pack = {
            title: film.name,
            poster: film.poster,
            synposis: film.synposis
          };
          return createMovie(pack);
        }
      })
      .save();
  }
}

