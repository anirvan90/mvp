var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/rank');
app.use(express.static(__dirname + '/../public'));

app.listen(3000);
console.log('App listening on port 3000');
module.exports = app;