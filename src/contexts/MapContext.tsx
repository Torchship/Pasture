// RoomContext.tsx
import React, { useState } from 'react';
import { Room } from '../data/Map';

interface MapContextProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  children?: React.ReactNode;
}

const MapContext = React.createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<MapContextProps> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  return (
    <MapContext.Provider value={{ rooms, setRooms }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
