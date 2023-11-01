import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './variables.css';
import App from './App';
import { SocketProvider } from './SocketContext';
import { SessionProvider } from './contexts/SessionContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SocketProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </SocketProvider>
  </React.StrictMode>,
);
