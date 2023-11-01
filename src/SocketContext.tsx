import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './data/SocketEvents';

const SocketContext = createContext<Socket<ServerToClientEvents, ClientToServerEvents> | undefined>(undefined);

interface SocketProviderProps {
  children?: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001');
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
