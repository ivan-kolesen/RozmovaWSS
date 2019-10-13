const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = process.env.port || 8080;
const server = app.listen(port);
const wss = new WebSocket.Server({ server });

let userId = 1;
let messageId = 1;

wss.on('connection', ws => {
  ws.send(JSON.stringify({
    type: "auth",
    userId: userId++
  }));

  ws.on('message', message => {
    const sendingMessage = JSON.stringify({
      ...JSON.parse(message),
      id: messageId++
    });

    wss.clients.forEach( client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(sendingMessage);
      }
    });
  })
});