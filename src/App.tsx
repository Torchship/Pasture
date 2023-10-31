import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { useSocket } from './SocketContext';
import { Responsive, WidthProvider } from 'react-grid-layout';
import InteractiveMap from './components/Map/InteractiveMap';
import { Header } from './components/Header';
import { Container } from './components/Container';
import Dropdown from './components/Dropdown';
import { Room } from './data/Map';
import ModalDialog from './components/ModalDialog';

const ResponsiveGridLayout = WidthProvider(Responsive);

const App: React.FC = () => {
  const socket = useSocket();
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const height = (containerHeight || 0) / 12;

  const rooms: Room[] = [
    {
      x: 0,
      y: 0,
      z: 0,
      name: 'Room A',
      id: 1,
      exits: [{ id: 4, name: 'East', source: 1, dest: 2, aliases: ['E'] }],
    },
    {
      x: 1,
      y: 0,
      z: 0,
      name: 'Room B',
      id: 2,
      exits: [
        { id: 5, name: 'West', source: 2, dest: 1, aliases: ['W'] },
        { id: 6, name: 'Northwest', source: 2, dest: 3, aliases: ['NW'] },
      ],
    },
    {
      x: 0,
      y: 1,
      z: 0,
      name: 'Room C',
      id: 3,
      exits: [
        { id: 6, name: 'Southeast', source: 3, dest: 2, aliases: ['SE'] },
      ],
    },
  ];

  return (
    <div className="mainDiv">
      <ModalDialog isOpen={false} />
      <div ref={containerRef} style={{ height: '100vh', width: '100vw' }}>
        <Header title="PASTURES" subtitle="VERSION 0.1" style={{marginBottom: '2em', marginTop: '1em'}}/>
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 12 }}
          margin={[0, 0]}
          rowHeight={height}
          layouts={{
            lg: [
              { i: 'map', x: 0, y: 0, w: 9, h: 8 },
              { i: 'properties', x: 9, y: 0, w: 3, h: 8 },
              { i: 'terminal', x: 0, y: 8, w: 9, h: 4 },
              { i: 'areas', x: 9, y: 8, w: 3, h: 4 },
            ],
          }}
        >
          <div key="map" style={{display: 'flex', flexDirection: 'column'}}>
            <Header title="MAP EDITOR" />
            <Container >
              <InteractiveMap rooms={rooms} />
            </Container>
            <Dropdown
              style={{ position: 'absolute', right: '3em', top: '4em' }}
              label="Dropdown"
              options={['Sample 1', 'Sample 2', 'Sample 3']}
              onSelect={() => {}}
            />
          </div>
          <div key="properties">
            <Header
              title="PROPERTIES"
              // subtitle={`${selectedElement?.id || '<None Selected>'}`}
            />
          </div>
          <div key="terminal">
            <Header title="TERMINAL" />
          </div>
          <div key="areas">
            <Header title="AREAS" />
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
export default App;
