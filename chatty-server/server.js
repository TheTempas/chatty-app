const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function colorPicker () {
  let removedColor = colorArray.shift();
  colorArray.push(removedColor);
  return removedColor;
}

let colorArray = ["#0020C2", "#571B7E", "#E4287C", "#C11B17"];

// Set up a callback that will run when a client connects to the server.
// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.clients.forEach(function (client) {
    let numberConnectedClients = {connectedClients: wss.clients.size, type: "connectedClients"};
    client.send(JSON.stringify(numberConnectedClients));
    });

  let color = {
    type: "userColor",
    color: colorPicker()
  };

  ws.send(JSON.stringify(color));

  ws.on('message', (data) => {
    console.log(data);
    wss.clients.forEach(function (client) {
        client.send(JSON.stringify(JSON.parse(data)));
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');

  wss.clients.forEach(function (client) {
    let numberConnectedClients = {connectedClients: wss.clients.size, type: "connectedClients"};
    client.send(JSON.stringify(numberConnectedClients));
    });
  })
});