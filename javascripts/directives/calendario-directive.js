'use strict';

(function(angular) {
  angular
    .module('frontendTestApp')
    .directive('calendarioDirective', [
      function() {
        return {
          restrict: 'A',
          scope: false,
          link: function(scope, element, attribute) {
            var cal = $(element).calendario({
              onDayClick: function($el, data, dateProperties) {
                // highlight selected day
                $('.fc-body').find('.selected').removeClass('selected');
                $el.addClass('selected');

                scope.$apply(function() {
                  scope.selectedDate = [dateProperties.weekdayname, dateProperties.monthname, dateProperties.day].join(' ');
                });
              }
            });

            scope.selectedMonth = [cal.getMonthName(), cal.getYear()].join(' ');
            scope.selectedDate = [cal.getWeekdayname(), cal.getMonthName(), cal.getDate()].join(' ');
          },
        };
      }
    ]);
})(angular);
