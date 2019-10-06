const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = app.listen(4000, function(){
  console.log('listening for requests on port 4000,');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log("connected");

  ws.on('message', message => {
    console.log(message);
    ws.send(message);
  })
});