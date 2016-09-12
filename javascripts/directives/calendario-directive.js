(function(angular) {
  'use strict';

  angular
    .module('frontendTestApp')
    .directive('calendarioDirective', [
      function() {
        return {
          restrict: 'A',
          scope: {
            selectedDate: '=',
            selectedMonth: '=',
            getTasksByDate: '&'
          },
          link: function(scope, element, attribute) {
            var cal = $(element).calendario({
              onDayClick: function($el, data, dateProperties) {
                // highlight selected day
                $('.fc-body').find('.selected').removeClass('selected');
                $el.addClass('selected');

                // pre-process date
                var selectedDay = (dateProperties.day < 10 ? '0' : '') + dateProperties.day,
                  selectedMonth = (dateProperties.month < 10 ? '0' : '') + dateProperties.month,
                  selectedDate = [dateProperties.year, selectedMonth, selectedDay].join('-');

                scope.$apply(function() {
                  scope.selectedDate = [dateProperties.weekdayname, dateProperties.monthname, dateProperties.day].join(' ');
                });

                scope.getTasksByDate({ date: selectedDate });
              }
            });

            scope.selectedMonth = [cal.getMonthName(), cal.getYear()].join(' ');
            scope.selectedDate = [cal.getWeekdayname(), cal.getMonthName(), cal.getDate()].join(' ');
          },
        };
      }
    ]);
})(angular);
