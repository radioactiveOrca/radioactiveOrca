angular.module('moviedash', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/landing");

  $stateProvider
    .state('landing', {
      url : '/landing',
      // controller: 'LandingController',
      templateUrl: 'app/landing/landing.html'
    })
    .state('movies', {
      url : '/movies',
      // controller: 'MoviesController',
      templateUrl: 'app/movies/movies.html'
    })
    .state('details', {
      url: '/details',
      // controller: 'DetailsController',
      templateUrl: 'app/details/details.html'
    });
});
