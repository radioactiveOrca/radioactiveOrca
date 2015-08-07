describe('LandingCtrl', function() {
  /*
  beforeEach(module('moviedash'));
  beforeEach(module('moviedash.landing'));
  beforeEach(module('moviedash.services'));
  it ('injector should load', function() {
    var $injector = angular.injector();
    expect($injector.get('$injector')).toBe($injector);
    expect($injector.invoke(function($injector) {
      return $injector;
    })).toBe($injector);
  });

  var $scope, ctrl, $controller;

  //you need to inject dependencies first
  beforeEach(inject(function($rootScope, $injector) {
    $scope = $rootScope.$new();
    $controller = $injector.get('$controller');   
  }));

  it('$scope should be defined', function() {
    expect($scope).toBeDefined();
  });
  it('Should initialize controller', inject(function($controller) {
      ctrl = $controller('LandingCtrl', {
          $scope: $scope
      });
      expect(ctrl).toBeDefined();
  }));
*/
  // var $scope, $rootScope, createController;
  // console.log("BEFORE INJECTION <-----------------------")
  // beforeEach(inject(function($injector) {

  //   // mock out our dependencies
  //   $rootScope = $injector.get('$rootScope');
  //   $scope = $rootScope.$new();

  //   var $controller = $injector.get('$controller');

  //   // used to create our AuthController for testing
  //   createController = function () {
  //     return $controller('LandingCtrl', {
  //       $scope: $scope
  //     });
  //   };
  // }));

  // it('should have controller', function() {
  //   var ctrl = createController();
  //   console.log("_________________>>>", ctrl)
  //   expect(ctrl).toBeDefined();
  // });
  // var $rootScope, $scope, $controller;

  // beforeEach(inject(function(_$rootScope_, _$controller_){
  //      $rootScope = _$rootScope_;
  //      $scope = $rootScope.$new();
  //      $controller = _$controller_;

  //      landingController = $controller('LandingCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
  //  }));

  //  it('should exist', function() {
  //      expect(landingController).toBeDefined();
  //  });

  // var $controller;
  // beforeEach(inject(function(_$controller_){
  //   $controller = _$controller;
  // }));

  // describe('$scope.findLocation', function() {
  //   it ('is a function', function () {
  //     var $scope = {};
  //     var controller = $controller('LandingCtrl', { $scope: $scope});
  //     expect(typeof $scope.findLocation).toEqual('function');
  //   });
  // });
});