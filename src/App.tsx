import React, { useEffect } from 'react';
import Main from './views/Main';
import './App.css';
import { useSocket } from './SocketContext';

const App: React.FC = () => {
  const socket = useSocket();

  useEffect(() => {
    socket.on('message', (msg: string) => {
        console.log('Message from server:', msg);
    });

    // Send a message to the server when component mounts
    socket.emit('message', 'Hello from React!');

    return () => {
        // cleanup listeners on unmount
        socket.off('message');
    };
}, [socket]);

  return (
    <div className="mainDiv">
      <Main/>
    </div>
  );
}
export default App;
