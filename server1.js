var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 3000})

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })

  setInterval(
    () => ws.send('hi from node3000 server  '+ message),
    1000
  )
})
