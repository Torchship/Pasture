import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import net from 'net';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from '../data/SocketEvents';

const app = express();
const server = http.createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

interface SocketData {
  torchship: net.Socket;
  callbacks: { [command: string]: { [correlationId: string]: (jsonBody: any) => void } };
}

const getCorrelationId = () => {
  const currentTimeStr = (Date.now() / 1000).toFixed(5).replace('.', '');
  return parseInt(currentTimeStr.slice(-9), 10);
};

io.on("connection", (socket) => {
    // Create a connection to moo.torchship.org on port 41578
    socket.data.torchship = net.createConnection(41578, 'moo.torchship.org');
    socket.data.callbacks = {};
    function sendCommand(command: string, request: any, callback: (response: string) => void) {
        if (socket.data.torchship.closed) {
          console.log('torchship is disconnected');
          return;
        }
        // If the command doesn't exist in the callbacks object, create an empty object for it
        if (!socket.data.callbacks[command]) {
          socket.data.callbacks[command] = {};
        }

        const correlationId = getCorrelationId();
    
        // Assign the callback to the appropriate correlation id for the given command
        socket.data.callbacks[command][correlationId] = callback;

        // Write the command
        socket.data.torchship.write(`${command}:${correlationId} ${JSON.stringify(request)}\n`, (err) => {
          if (err) {
            return console.log(`ERROR WRITING [${command}:${correlationId} ${JSON.stringify(request)}]: ${err}`);
          }
          console.log(`wrote: ${command}:${correlationId} ${JSON.stringify(request)}`);
        });
    }

    socket.data.torchship.on('error', (error) => {
      console.error('Error connecting to torchship:', error);
      socket.emit('raw', 'Unable to establish connection to moo.torchship.org:41578');
    });  

    let partialData = ''; // To handle cases where a message is split across multiple 'data' events

    socket.data.torchship.on('data', (bufferedData: Buffer) => {
        // Convert buffer to string and append to any partial data from previous events
        const combinedData = partialData + bufferedData.toString();

        // Split the combined data by newline
        const entries = combinedData.split('\n');

        // If the last entry is not complete (i.e., the message was split), keep it for the next 'data' event
        if (combinedData.endsWith('\n')) {
            partialData = '';
        } else {
            partialData = entries.pop() || '';
        }

        entries.forEach(entry => {
            console.log(`received: ${entry}`);
            const match = entry.match(/(\w+):(\d+)(?: (.+))?/);

            if (match) {
                const command = match[1];
                const correlationId = match[2];
                const jsonResponse = match[3];

                // Look up the callback in the data structure
                const commandCallbacks = socket.data.callbacks[command];
                if (commandCallbacks) {
                    const specificCallback = commandCallbacks[correlationId];
                    if (specificCallback) {
                        specificCallback(jsonResponse);
                    }
                }
            }
        });
    });

    socket.data.torchship.on('end', () => {
      console.log('Disconnected from torchship');
    });

    socket.on('login', (username: string, password: string, callback: (msg: string) => void) => {
      sendCommand('login', {username: username, password: password}, callback);
    })

    socket.on('get', (data: string, callback: (msg: string) => void) => {
      sendCommand(`GET_${data}`, {}, callback);
    })

    socket.on('hello', () => {
      console.log('client said hello');
    })
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
