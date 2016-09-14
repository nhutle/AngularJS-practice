(function(angular) {
  'use strict';

  angular
    .module('frontendTestApp')
    .directive('calendarioDirective', [
      function() {
        return {
          restrict: 'A',
          scope: {
            getTasksByDate: '&'
          },
          link: function(scope, element, attribute) {
            var cal = $(element).calendario({
              onDayClick: function($el, data, dateProperties) {
                // pre-process date
                var selectedDay = (dateProperties.day < 10 ? '0' : '') + dateProperties.day,
                  selectedMonth = (dateProperties.month < 10 ? '0' : '') + dateProperties.month,
                  selectedDate = [dateProperties.year, selectedMonth, selectedDay].join('-');

                scope.getTasksByDate({ date: selectedDate });
              }
            });
          },
        };
      }
    ]);
})(angular);
