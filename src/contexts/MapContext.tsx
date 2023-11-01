// RoomContext.tsx
import React, { useState } from 'react';
import { Area, Room } from '../data/Map';

interface MapContextProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
}

// Provide a definite type for the context and default values
const defaultState: MapContextProps = {
  rooms: [],
  setRooms: () => {},
  areas: [],
  setAreas: () => {}
};

const MapContext = React.createContext<MapContextProps>(defaultState);

export const SessionProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  return (
    <MapContext.Provider value={{ rooms, setRooms, areas, setAreas }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
