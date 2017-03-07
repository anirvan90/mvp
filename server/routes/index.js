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

router.param('/post', function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function(err, post) {
    if(err) { next(err); }
    if(!post) { next(new Error('Couldn\'t Find Post')) }

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res, next, id) {
  res.json(req.post);
});

router.put('/posts/:post/voteup', function(req, res, next) {
  req.post.voteup(function(err, post) {
    if(err) { next(err) }
    res.json(post);
  });
});

module.exports = router;