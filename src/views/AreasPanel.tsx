import React, { useContext, useEffect } from 'react';
import Button from '../elements/Button';
import TabContainer from '../elements/TabContainer';
import Tab from '../elements/Tab';
import MapContext from '../contexts/MapContext';
import { useSocket } from '../SocketContext';
import { ScrollableContainer } from '../elements/ScrollableContainer';
import { Area } from '../data/Map';

export interface Props {
  height?: number;
  onAreaClick?: (area: Area) => void;
  selectedArea?: Area;
}

const AreasPanel: React.FC<Props> = ({height, onAreaClick, selectedArea}) => {
  const {areas, setAreas, rooms, setRooms} = useContext(MapContext);
  const socket = useSocket();

  useEffect(() => {
    socket.emit('get', 'areas', (json => {
      setAreas(JSON.parse(json));
    }));
  }, [setAreas, socket]);

  const handleAreaClick = (area: Area) => {
    socket.emit('query', 'rooms', {area_id: area.id}, (json => {
      const newRooms = JSON.parse(json);
      // Create a copy of the current rooms state
      const updatedRooms = {...rooms};

      // Assign new values to the copy
      for (let id in newRooms) {
          updatedRooms[Number(id)] = newRooms[id];
      }

      setRooms(updatedRooms);
      onAreaClick?.(area);
    }))
  }

  return (
    <>
      <TabContainer>
        <Tab label="Areas">
          <ScrollableContainer maxHeight={height ? height * 0.8 : 200}>
            {Object.entries(areas).map(([areaIdStr, area]) => (
              <Button key={areaIdStr} label={area.name} onClick={() => handleAreaClick(area)} selected={selectedArea === area}/>
            ))}
          </ScrollableContainer>
        </Tab>
        <Tab label="Zones">
        </Tab>
      </TabContainer>
    </>
  );
};

export default AreasPanel;