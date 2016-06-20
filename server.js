var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});