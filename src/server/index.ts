import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import net from 'net';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  let torchshipSocket: net.Socket;
    // Create a connection to moo.torchship.org on port 41578
    torchshipSocket = net.createConnection(41578, 'moo.torchship.org');

    torchshipSocket.on('error', (error) => {
      console.error('Error connecting to torchship:', error);
      io.emit('message', 'Unable to establish connection to moo.torchship.org:41578');
    });  

    torchshipSocket.on('data', (data) => {
      console.log(data.toString());
      // Buffer the data until we have a complete line
      let buffer = data.toString();
      const newlineIndex = buffer.indexOf('\n');

      if (newlineIndex !== -1) {
        const message = buffer.slice(0, newlineIndex);
        io.emit('message', message); // Send message to client
        buffer = buffer.slice(newlineIndex + 1);
      }
    });

    torchshipSocket.on('end', () => {
      console.log('Disconnected from torchship');
    });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    torchshipSocket.end(); // Close the torchship connection when user disconnects
  });

  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    if (torchshipSocket.closed) {
      io.emit('message', 'Unable to send command; no active connection to Torchship.');
      return;
    }
    torchshipSocket.write(msg); // Relay the message to torchship
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
