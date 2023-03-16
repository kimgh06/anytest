var http = require('http');
var path = require('path');
var app = express();

var server = http.createServer(function (request, response) {

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end('Hello node.js!!');

});

server.listen(8080, function () {
  console.log('서버 구동중...');
});