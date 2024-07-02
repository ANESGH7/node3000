var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message);
    // Send a specific message back to the client
    ws.send('Received your message: ' + message);
  });
});
