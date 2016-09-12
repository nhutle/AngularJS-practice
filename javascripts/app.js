(function(angular) {
  'use strict';

  angular
    .module('frontendTestApp', [
      'ngResource',
      'ngRoute',
      'LocalStorageModule',
      'ngMockE2E'
    ])
    .config(['localStorageServiceProvider',
      function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
      }
    ])
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/dates/:dateId', {
            controller: 'homeController',
            templateUrl: 'views/home.html'
          })
          .otherwise({
            redirectTo: '/dates/' + new Date().toISOString().slice(0, 10)
          });
      }
    ]);
})(angular);
