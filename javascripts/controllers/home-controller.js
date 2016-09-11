'use strict';

(function(angular) {
  angular
    .module('frontendTestApp')
    .controller('homeController', ['$scope',
      function($scope) {
        // calendario
        var $calendar = $('#calendar'),
          cal = $calendar.calendario({
            onDayClick: function($el, data, dateProperties) {
              $scope.$apply(function() {
                $scope.selectedDate = [dateProperties.weekdayname, dateProperties.monthname, dateProperties.day].join(' ');
              });
            }
          });
''
        $scope.selectedMonth = [cal.getMonthName(), cal.getYear()].join(' ');
        $scope.selectedDate = [cal.getWeekdayname(), cal.getMonthName(), cal.getDate()].join(' ');
      }
    ]);
})(angular);


//////
///
///
///
///
///////
///
// data: {
//   date1: {
//     user1: {
//       user_id: nhutle
//       username: Nhut Le
//       avatar: nhutle_avatar.png
//       task: {
//           task_id: task1
//           comment: add new comment to 8am post
//           posts: {
//             post1: {
//               post_id: time
//               createdTime: 8:00am
//               content: {
//                 post_child {
//                   post_child_id
//                   image: image_url,
//                   title: Notes UK
//                   source: twitter
//                   status: approved
//                 }
//               }
//             }
//         }
//       }
//     }
//   }
// }
// ///
// ///
// ///


// data =[{
//   {
//     'date': '10-09-2016',
//     'campaigns': [

//     ]
//   }
// }];

// campaigns:
//   id
//   name
//   user_id
//   photo
//   content
//   starting time
//   comment
//   status
//   source


// campaigns:









// posts
//   post_id
//   source



// user:
//   id
//   name
//   avatar
