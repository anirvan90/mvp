var app = angular.module('highlightRank', ['ngRoute','ngSanitize','angular.filter']);
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
    });
  }
  postItems.voteup = function(post) {
    return $http.put('/posts/'+post._id+'/voteup').then(function(data){
      post.votes += 1;
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
    $scope.weekNum;
    var checkTop = function() {
      var top = $scope.posts.sort(function(a, b){
        return b.votes - a.votes;
      })
      return top[0].link;
    }
    posts.getAll().then(function() {
      $scope.posts = posts.post.data;
      // var top = $scope.posts.sort(function(a, b){
      //   return b.votes - a.votes;
      // });
     $scope.urlString = checkTop();
    });
    $scope.selectWeek = function(week) {
      // $scope.filteredByWeek = week;
      console.log($scope.weekNum);
    }
    $scope.incrementVotes = function(post) {
      $scope.urlString = checkTop();
      posts.voteup(post);
    }
    $scope.playVideo = function(post) {
      $scope.urlString = post.link;
    }
  }
]);