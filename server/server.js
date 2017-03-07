var express = require('express');
var mongoose = require('mongoose');
var app = express();

var router = require('./routes');

mongoose.connect('mongodb://localhost/rank');
require('./models/Posts')
app.use(express.static(__dirname + '/../public'));

app.use(router);

app.listen(3000);
console.log('App listening on port 3000');
module.exports = app;