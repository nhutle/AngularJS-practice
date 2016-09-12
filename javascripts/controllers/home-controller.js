(function(angular) {
  'use strict';

  angular
    .module('frontendTestApp')
    .controller('homeController', [
      '$scope',
      '$location',
      '$routeParams',
      '$timeout',
      '$log',
      'homeService',
      function($scope, $location, $routeParams, $timeout, $log, homeService) {
        homeService.getTasksByDate($routeParams.dateId).then(function(data) {
          console.log(data);
          $scope.tasksByDate = data;
        }, function(message) {
          $log.error(message);
        });

        // http://stackoverflow.com/questions/24143945/location-path-updates-after-the-second-click
        $scope.getTasksByDate = function(date) {
          $timeout(function() {
            $scope.currentPath = $location.path('/dates/' + date);
          }, 0);
        };

        $scope.getTodayTasks = function() {
          var dateId = new Date().toISOString().slice(0, 10);

          $scope.getTasksByDate(dateId);
        };
      }
    ]);
})(angular);
