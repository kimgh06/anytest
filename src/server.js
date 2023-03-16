var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

var server = http.createServer(function (request, response) {
  // response.writeHead(200, { 'Content-Type': 'text/html' });
  // response.end('Hello node.js!!');
  app.use(express.static(path.join(__dirname, 'webcamtest/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/webcamtest/build/index.html"));
  });
});

server.listen(8080, function () {
  console.log('서버 구동중...');
});