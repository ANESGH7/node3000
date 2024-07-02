const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer();

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

wss.on('connection', (ws) => {
    // Generate a unique ID for each client
    const clientId = Math.random().toString(36).substr(2, 9);
    clients.set(clientId, ws);

    ws.on('message', (message) => {
        // Handle incoming messages
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        // Remove the client from the map when they disconnect
        clients.delete(clientId);
    });
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log('WebSocket server listening on port 8080');
});
