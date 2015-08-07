var movie = require('./model.js');
var Q = require('q');

module.exports = {

  // TODO: create add movie function
  addMovie: function(film) {
    // var createMovie = Q.nbind(movie.create, movie);
    // var findMovie = Q.nbind(movie.findOne, movie);
    
    // Checks if the movie exists and if it does
    // Sends the movie up to packer
    movie.findOne({title: film.title})
      .exec(function(err, match){
        if (err) {
          console.log(err)
        }
        if (match) {
          return match;
        } else {
          
          // fetch the movie title, poster, synposis
          // from packer and then store it in the DB
          var newMovie = new movie({
            title: film.title,
            poster: film.poster,
            synposis: film.synposis
          })
          newMovie.save(function(err, movie) {
            if (err) {
              console.log(err);

            }
            return movie
          });
         
        }
      })
      
  }
}

