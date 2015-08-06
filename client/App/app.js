angular.module('moviedash', [
  'moviedash.landing',
  'moviedash.movies',
  'moviedash.details',
  'moviedash.services',
  'ui.router',
  'ngMock'
])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/landing");

  $stateProvider
    .state('landing', {
      url : '/landing',
      controller: 'LandingCtrl',
      templateUrl: 'app/landing/landing.html'
    })
    .state('movies', {
      url : '/movies',
      controller: 'MoviesCtrl',
      templateUrl: 'app/movies/movies.html'
    })
    .state('details', {
      url: '/details',
      controller: 'DetailsCtrl',
      templateUrl: 'app/details/details.html'
    });
});
