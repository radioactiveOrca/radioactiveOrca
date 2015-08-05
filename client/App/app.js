angular.module('moviedash', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/landing");

  $stateProvider
    .state('landing', {
      url : '/landing',
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .state('movies', {
      url : '/movies',
      templateUrl: 'app/movies/movies.html',
      controller: 'MoviesController'
    })
    .state('details', {
      url: '/details',
      templateUrl: 'app/details/details.html',
      controller: 'DetailsController'
    });
});
