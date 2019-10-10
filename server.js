const express = require('express');
const WebSocket = require('ws');

const app = express();

const port = process.env.port || 8080;

const server = app.listen(port, function(){
  console.log('listening for requests');
});

const wss = new WebSocket.Server({ server });

let userId = 1;
let messageId = 1;

wss.on('connection', ws => {
  console.log("connected");

  ws.send(JSON.stringify({
    type: "auth",
    value: {
      id: userId++
    }
  }));

  ws.on('message', message => {
    const recievedMessage = JSON.parse(message);
    console.log(recievedMessage)
    const sendingMessage = {
      type: "message",
      value: {
        ...recievedMessage,
        id: messageId++
      }
    };

    wss.clients.forEach( client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(sendingMessage));
      }
    });

    //ws.send(JSON.stringify(sendingMessage));
  })
});