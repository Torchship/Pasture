import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './variables.css';
import App from './App';
import "typeface-fira-mono";
import { SocketProvider } from './SocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);