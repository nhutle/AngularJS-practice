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
        var date = new Date($routeParams.dateId);
        $scope.da = date;

        homeService.getTasksByDate($routeParams.dateId).then(function(data) {
          var date = new Date($routeParams.dateId),
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

          $scope.selectedDate = [days[date.getDay()], months[date.getMonth()], date.getFullYear()].join(' ');
          $scope.tasksByDate = data;

        }, function(message) {
          $log.error(message);
        });

        // http://stackoverflow.com/questions/24143945/location-path-updates-after-the-second-click
        $scope.getTasksByDate = function(date) {
          $timeout(function() {
            $location.path('/dates/' + date);
          }, 0);
        };

        $scope.getTodayTasks = function() {
          var dateId = new Date().toISOString().slice(0, 10);

          $scope.getTasksByDate(dateId);
        };
      }
    ]);
})(angular);
