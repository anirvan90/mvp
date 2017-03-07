var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  votes: {type: Number, default:0}
});

PostSchema.methods.voteup = function (cb) {
  this.votes += 1;
  this.save(cb);
}

module.exports = mongoose.model('Post', PostSchema);;