'use strict';

(function(angular) {
  angular
    .module('frontendTestApp', [
      'ngResource',
      'ngRoute',
      'LocalStorageModule',
      // 'ngMockE2E'
    ])
    .config(['localStorageServiceProvider',
      function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
      }
    ])
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            controller: 'homeController',
            templateUrl: 'views/home.html'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
})(angular);
