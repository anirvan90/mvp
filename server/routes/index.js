var express = require('express');
var router = express.Router();
var Post = require('../models/Posts');

var mongoose = require('mongoose');

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if(err) { next(err) };
    
    res.json(posts);
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post) {
    if(err) {next(err);}

    res.json(post);
  })
})
module.exports = router;