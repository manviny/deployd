// production.js
// si no carga deployd =>   export NODE_PATH="/usr/lib/node_modules"
// 
var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'production',
  db: {
    host: 'localhost',
    port: 27017,
    name: 'chat',
    credentials: {
      username: 'chat',
      password: 'chat'
    }
  }
});

server.listen();

server.on('listening', function() {
  console.log("Server is listening");
});

server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});