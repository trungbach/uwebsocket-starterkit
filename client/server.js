const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:1024');

const TOPIC = 'test-topics'
socket.on('open', () => {
  console.log('WebSocket connection opened');
   // subscribe to topic 'my-topics'
   const subscriptionMessage = JSON.stringify({
    action: 'subscribe',
    topic: TOPIC
  });

  socket.send(subscriptionMessage);
});

socket.on('message', (message) => {
  console.log('Received message ne:', message.toString());
});

socket.on('close', () => {
  console.log('WebSocket connection closed');
});

socket.on('error', (error) => {
  console.error('WebSocket error:', error.message);
});