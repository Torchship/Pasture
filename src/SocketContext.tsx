import React, { createContext, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | undefined>(undefined);

interface SocketProviderProps {
    children?: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socket = io('http://localhost:3001');

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
