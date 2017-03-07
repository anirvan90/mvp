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
      // console.log(postItems.post);
    });
  }
  return postItems;
}]);
app.controller('MainCtrl', [
  '$scope',
  "$sce",
  "posts",
  function($scope, $sce, posts, post) {
    $scope.trust = function(url){
      return $sce.trustAsResourceUrl(url);
    }
    posts.getAll().then(function() {
      $scope.posts = posts.post.data;
     $scope.urlString = $scope.posts[0].link;
      // console.log($scope.posts);
    });
    $scope.incrementVotes = function(post) {
      post.votes += 1;
    }
    $scope.playVideo = function(post) {
      $scope.urlString = post.link;
    }
  }
]);