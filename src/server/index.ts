import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: ["GET", "POST"] // set allowed methods
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
