const express = require('express');
const WebSocket = require('ws');

const app = express();

const port = process.env.port || 8080;

const server = app.listen(port, function(){
  console.log('listening for requests');
});

const wss = new WebSocket.Server({ server });
let messageId = 1;

wss.on('connection', ws => {
  console.log("connected");

  ws.on('message', message => {
    const recievedMessage = JSON.parse(message);
    const sendingMessage = {
      ...recievedMessage,
      id: messageId++
    };

    wss.clients.forEach( client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(sendingMessage));
      }
    });

    //ws.send(JSON.stringify(sendingMessage));
  })
});