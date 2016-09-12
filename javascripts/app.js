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
          .when('/dates', {
            controller: 'homeController',
            templateUrl: 'views/home.html'
          })
          .when('/dates/:dateId', {
            controller: 'homeController',
            templateUrl: 'views/home.html'
          })
          .when('/tasks/:id', {
            controller: 'homeController',
            templateUrl: 'views/home.html'
          })
          .otherwise({
            redirectTo: '/tasks/1'
          });
      }
    ]);
})(angular);

/// home ~ /task_id: first
/dates/:dateId/tasks/:taskId
