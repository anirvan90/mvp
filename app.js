var app = angular.module('highlightRank', []);

app.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.posts = [
      {title: 'video1', description: 'something here', votes:1},
      {title: 'video2', description: 'something here', votes:10},
      {title: 'video3', description: 'something here', votes:6},
      {title: 'video4', description: 'something here', votes:4},
      {title: 'video5', description: 'something here', votes:5}
    ];
  }
]);