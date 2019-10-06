const express = require('express');
const WebSocket = require('ws');

const app = express();

const port = process.env.port || 8080;

const server = app.listen(port, function(){
  console.log('listening for requests');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log("connected");

  ws.on('message', message => {
    console.log(message);
    ws.send(message);
  })
});