var app = angular.module('highlightRank', ['ngRoute','ngSanitize']);
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index.html',
    controller: 'MainCtrl'
  });
});
app.factory('posts', ['$http', function($http) {
  var postItems = {
    post: []
  }
  postItems.getAll = function() {
    return $http.get('/posts').then(function(data) {
      angular.copy(data, postItems.post);
      console.log(postItems.post);
    });
  }
  return postItems;
}]);
app.controller('MainCtrl', [
  '$scope',
  "$sce",
  "posts",
  function($scope, $sce, posts) {
    $scope.trust = function(url){
      return $sce.trustAsResourceUrl(url);
    }
    posts.getAll().then(function() {
      console.log(postItems);
    });
    // $scope.posts = [
    //   {title: 'Fernando Llorente vs Burnely', link:'https://www.youtube.com/embed/01j08KmeIyw', votes:0},
    //   {title: 'Harry Kane vs Everton', link: 'https://www.youtube.com/embed/qVxnYmIitzE', votes:0},
    //   {title: 'Leicester vs Hull', link: 'https://www.youtube.com/embed/70PWyDv93Bg', votes:0},
    //   {title: 'Zlatan vs EVERYONE!', link: 'https://www.youtube.com/embed/kTI3lNTz4fA', votes:0},
    //   {title: 'Sadio Mane vs Arsenal', link: 'https://www.youtube.com/embed/51woOX_Leog', votes:0}
    // ];
    $scope.urlString = $scope.posts[0].link;
    $scope.incrementVotes = function(post) {
      post.votes += 1;
    }
    $scope.playVideo = function(post) {
      $scope.urlString = post.link;
    }
  }
]);