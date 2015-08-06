var movie = require('./model.js');
var Q = require('q');

module.exports = {

  findAllMovies = function(req, res, next) {
    var findAllMovies = Q.nbind(Movie.find, Movie);

    findAll({})
      .then(function (movies) {
        // Send back to packer
        res.json(movies);
      })
      .fail(function (error) {
        next(error);
      });
  },

  // TODO: create add movie function
  addMovie = function(req, res, next) {
    var createMovie = Q.nbind(Movie.create, Movie);
    var findMovie = Q.nbind(Movie.findOne, Movie);

    // Checks if the movie exists and if it does
    // Sends the movie up to packer
    findMovie({title: title})
      .then(function(match){
        if (match) {
          res.send(match);
        } else {
          // fetch the movie title, poster, synposis
          // from packer and then store it in the DB
          var pack = {
            title:
            urlPoster:
            synposis:
          };
          return createMovie(pack);
        }
      })
      .save();
  }
}

