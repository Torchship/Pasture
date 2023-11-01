import React, { useState } from 'react';
import { Area, Room } from '../data/Map';

interface MapContextProps {
  rooms: Record<number, Room>;
  setRooms: React.Dispatch<React.SetStateAction<Record<number, Room>>>;
  areas: Record<number, Area>;
  setAreas: React.Dispatch<React.SetStateAction<Record<number, Area>>>;
}

// Provide a definite type for the context and default values
const defaultState: MapContextProps = {
  rooms: {},
  setRooms: () => {},
  areas: {},
  setAreas: () => {}
};

const MapContext = React.createContext<MapContextProps>(defaultState);

export const MapProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const [rooms, setRooms] = useState<Record<number, Room>>({});
  const [areas, setAreas] = useState<Record<number, Area>>({});

  return (
    <MapContext.Provider value={{ rooms, setRooms, areas, setAreas }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
