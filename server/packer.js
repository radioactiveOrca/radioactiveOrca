var movieCtrler = require('../server/movieModel/movieController.js');
var request = require('request');

module.exports = function(movies, callback) {
  var index = 0;
  var results = [];
  //Recursive function to handle multiple async movie lookups
  var movieLookupHelper = function() {
    if (index > movies.length - 1) {
      //All movies have been packed. Call callback.
      callback(results);
    } else {
      var movie = movies[index];
      //check the database to see if we already have information for that movie
      checkForMovie(movie, function(found) {
      //if successfully found,
        if (found) {
        //pack that information in with the movies list and continue to next movie
          packInfo(found, index);
          index++;
          movieLookupHelper();
        } else {
        //hit IMDB for the required information
        
          getInfoFromIMDB(movie, function (data) {
            if (data) {
              //Add this data to the database
              addMovieToDB(data, movie);
              //Pack that information in with the movies list and continue to next movie
              packInfo(data, index);
              index++;
              movieLookupHelper();
            } else {
              //No data back from imdb
              //TODO: HANDLE ERROR HERE???
              index++;
              movieLookupHelper();
            }
          });
        }
      });
    }
  };
  
  
  
  var packInfo = function(movieData, index) {
    var movie = movies[index];
    movie.poster = movieData.poster;
    movie.synopsis = movieData.synopsis;
    results.push(movie);
  };
  var checkForMovie = function(movie, callback) {
    //callback(movieCtrler.addMovie(movie));
    movieCtrler.findMovie(movie.id, callback);
    //STUB:
    //TODO:
    //Interact with the database here
    //Call callback on movie data if it exists, or null if it doesn't
  };
  var getInfoFromIMDB = function(movie, callback) {
    //TODO: 
    // IMDB API call here
    // console.log("-->>>>>>>>>>", movie)
    // var movieObj = "http://www.omdbapi.com/?i=“ + movie.id + "&plot=short&r=json"
    request("http://www.omdbapi.com/?i=" + movie.id + "&plot=short&r=json", function(error, response, body){
      
      body = JSON.parse(body);

      var film = {};
      film.title = body.Title;
      film.poster = body.Poster;
      film.synopsis = body.Plot;
    
      callback(film);
    });
            // .on('response', function(response){
            //   console.log("IMDB IS WORKING", response.body)
              // var film = {};
              // film.title = response.body.Title;
              // film.poster = response.body.Poster;
              // film.synposis = response.Plot;
              // console.log(film)
              // callback(film);
            // });
    // request({
    //   url: "http://www.omdbapi.com/?i=" + movie.id + "&plot=short&r=json",
    //   method: 'GET'
    // })
    
    //call callback on movie data 

  }
  var addMovieToDB = function(imdbData, movie) {
    //TODO:
    //Handle add to database;
    return movieCtrler.addMovie(imdbData, movie);
  }
  
  movieLookupHelper();
  
};
     