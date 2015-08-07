var movie = require('./model.js');
var Q = require('q');

module.exports = {

  // TODO: create add movie function
  addMovie: function(imdbData, film) {
    // var createMovie = Q.nbind(movie.create, movie);
    // var findMovie = Q.nbind(movie.findOne, movie);
    
    // Checks if the movie exists and if it does
    // Sends the movie up to packer

    movie.findOne({_id: film.id})
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
            _id: film.id,
            title: imdbData.title,
            poster: imdbData.poster,
            synposis: imdbData.synposis
          })
          newMovie.save(function(err, movie) {
            if (err) {
              console.log(err);
            }
            return movie;
          });
         
        }
      })
  },
  findMovie: function(id, callback) {
    movie.findOne({_id: id})
    .exec(function(err, match) {
      if(err) {
        console.log(err)
        callback(null);
      } else if(match) {
        callback(match);
      } else {
        callback(null);
      }
    })
  }
}

