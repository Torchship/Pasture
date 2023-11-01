import React, { useContext, useEffect } from 'react';
import Button from '../elements/Button';
import TabContainer from '../elements/TabContainer';
import Tab from '../elements/Tab';
import MapContext from '../contexts/MapContext';
import { useSocket } from '../SocketContext';

const AreasPanel: React.FC = () => {
  const {areas, setAreas} = useContext(MapContext);
  const socket = useSocket();

  useEffect(() => {
    socket.emit('get', 'areas', (json => {
      const newAreas = JSON.parse(json);
      console.log('completed parsing');
      console.log(newAreas);
      setAreas(newAreas);
    }));
  });

  return (
    <>
      <TabContainer>
        <Tab label="Areas">
          {areas.map(area => (
            <Button key={area.id} label={area.name}/>
          ))}
        </Tab>
        <Tab label="Zones">
        </Tab>
      </TabContainer>
    </>
  );
};

export default AreasPanel;