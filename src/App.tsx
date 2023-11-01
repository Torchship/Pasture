import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { useSocket } from './SocketContext';
import { Responsive, WidthProvider } from 'react-grid-layout';
import InteractiveMap from './components/map/InteractiveMap';
import { Header } from './elements/Header';
import { Container } from './elements/Container';
import Dropdown from './elements/Dropdown';
import { Room } from './data/Map';
import ModalDialog from './elements/ModalDialog';
import Table from './elements/Table';
import Button from './elements/Button';
import AreasPanel from './views/AreasPanel';
import PropertiesPanel from './views/PropertiesPanel';
import TerminalPanel from './views/TerminalPanel';
import LoginDialog from './components/dialogs/LoginDialog';

const ResponsiveGridLayout = WidthProvider(Responsive);

const App: React.FC = () => {
  const socket = useSocket();
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLogin = (username: string, password: string) => {
    socket.emit(`connect ${username} ${password}`);
    setLoginOpen(false);
  };

  useEffect(() => {
    socket.on('message', (msg: string) => {
      console.log(msg);
      setMessages([...messages, msg]);
    });

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
      <LoginDialog isOpen={loginOpen} onLogin={handleLogin} />
      <ModalDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title="Test Modal Dialog">
        <Table>
          <tr>
            <td>Test</td>
            <td>Test2</td>
            <td><Button label="Test3" style={{width: "100%"}}/></td>
          </tr>
          <tr>
            <td>Test</td>
            <td>Test2</td>
            <td><Button label="Test3" style={{width: "100%"}}/></td>
          </tr>
          <tr>
            <td>Test</td>
            <td>Test2</td>
            <td><Button label="Test3" style={{width: "100%"}}/></td>
          </tr>
        </Table>
      </ModalDialog>
      <div ref={containerRef} style={{ paddingTop: '1vh', height: '98vh', width: '100vw' }}>
        <ResponsiveGridLayout
          draggableCancel=".noDrag"
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
          <div key="properties" style={{display: 'flex', flexDirection: 'column'}}>
            <PropertiesPanel/>
          </div>
          <div key="terminal" style={{display: 'flex', flexDirection: 'column'}}>
            <TerminalPanel messages={messages}/>
          </div>
          <div key="areas" style={{display: 'flex', flexDirection: 'column'}}>
            <AreasPanel />
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
export default App;
