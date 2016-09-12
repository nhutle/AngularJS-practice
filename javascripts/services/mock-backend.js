(function(angular) {
  'use strict';

  angular
    .module('frontendTestApp')
    .run([
      '$httpBackend',
      'database',
      function($httpBackend, database) {
        var taskRegEx = /\/dates\/([0-9-]+)/;

        $httpBackend
          .whenGET(taskRegEx)
          .respond(function(method, url, data) {
            var indices = taskRegEx.exec(url),
              dateId = indices[1];

            return [200, database.getTasksByDate(dateId)];
          });

        $httpBackend.whenGET(/\.html$/).passThrough();
      }
    ]);
})(angular);
