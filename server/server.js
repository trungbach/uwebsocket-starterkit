const uWS = require('uWebSockets.js');
const {sync} = require('./sync');

const app = uWS.App()

// for rest api
app.get('/hello', (res, req) => {
  res.writeStatus('200').end(JSON.stringify({msg: 'ok'}));
})

// for ws
app.ws('/*', { 
  open: (socket, req) => {
    console.log('A user connected');
  },
  message: (socket, message, isBinary) => {
    console.log(`Received message: ${Buffer.from(message).toString()}`);
    
    try {
      // Parse the incoming message as JSON
      const parsedMessage = JSON.parse(Buffer.from(message).toString());
      if (parsedMessage.action === 'subscribe' && parsedMessage.topic) {
        // Subscribe to the specified topic
        socket.subscribe(parsedMessage.topic);
        console.log(`User subscribed to topic: ${parsedMessage.topic}`);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  },
  drain: (socket) => {
    console.log('Socket backpressure: ' + socket.getBufferedAmount());
  },
  close: (socket) => {
      console.log('A user disconnected');
  }

})

app.listen(9001, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port 9001');
    sync(app.publish.bind(app))
  }
});
