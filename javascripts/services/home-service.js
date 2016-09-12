(function() {
  'use strict';

  angular
    .module('frontendTestApp')
    .factory('homeService', [
      '$http',
      '$q',
      '$log',
      function($http, $q, $log) {
        function getTasksByDate(dateId) {
          var deferred = $q.defer();

          $http
            .get('/dates/' + dateId)
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(message, code) {
              deferred.reject(message);
              $log.error(message, code);
            });

          return deferred.promise;
        }

        return {
          getTasksByDate: getTasksByDate
        };
      }
    ]);
})();
