var http = require('http');
var handler = require('./src/handler.js');

var port = 4000;
var message = 'I am so happy to be part of node girls workshop';



var server = http.createServer(handler);
server.listen(port, function() {
  console.log('server is listening on port ', port);
})