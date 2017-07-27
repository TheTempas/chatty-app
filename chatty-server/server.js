const express = require('express');
const SocketServer = require('ws').Server;

// const uuid = require('node-ws');

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
      // Anyone connected to web socket is a client in the forEach all clients being assigned a web socket.
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      // If client is not sender and web socket is open send message to all clients.
        client.send(JSON.stringify(JSON.parse(data)));
      // Send stringified data back to browser as a message.
      // }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

  wss.clients.forEach(function (client) {
    let numberConnectedClients = {connectedClients: wss.clients.size, type: "connectedClients"};
    client.send(JSON.stringify(numberConnectedClients));
    });
  })

});


// wss.broadcast = function(data) {
//   wss.clients.forEach(function(client) {
//     client.send(data)
//   });
// };

// function handleMessage(message_data) {
//   console.log(`Received: ${message_data}`)
//   let message = JSON.parse(message_data);
//   message.id = uid.v1();

//   let command = message.content.match(/^\/giphy\W+(w.*)$/i)
// }