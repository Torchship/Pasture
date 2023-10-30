import React, { useState, useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ZoomableRoomView, { Room } from '../MapView';
import { Header } from '../components/Header';
import { Container } from '../components/Container';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Main: React.FC = () => {
    const [containerHeight, setContainerHeight] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
        }
    }, []);
    const height = (containerHeight || 0) / 12;

    const rooms: Room[] = [
    { x: 0, y: 0, z: 0, name: 'Room A', objid: 1, exits: [2] },
    { x: 1, y: 0, z: 0, name: 'Room B', objid: 2, exits: [1, 3] },
    { x: 0, y: 1, z: 0, name: 'Room C', objid: 3, exits: [2] },
  ];
  return (
    <div ref={containerRef} style={{ height: '100vh', width: '100vw' }}>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        margin={[0, 0]}
        rowHeight={height}
        layouts={{
          lg: [
            // { i: 'toolbar', x: 0, y: 0, w: 12, h: toolbarHeightInVh / rowHeightInVh },
            // { i: 'red', x: 0, y: 2, w: 7, h: 1 },
            // { i: 'yellow', x: 7, y: 2, w: 5, h: 1 },
            // { i: 'green', x: 0, y: 1, w: 12, h: 30 / rowHeightInVh },
            {i: 'map', x: 0, y: 0, w: 9, h: 8},
            {i: 'properties', x: 9, y: 0, w: 3, h: 8},
            {i: 'terminal', x: 0, y: 8, w: 12, h: 4}
          ]
        }}
      >
        <div key="map">
            <Header title="MAP EDITOR" />
            <Container>
              <ZoomableRoomView rooms={rooms} />
            </Container>
        </div>
        <div key="properties">
          <Header title="PROPERTIES" />
        </div>
        <div key="terminal">
          <Header title="TERMINAL" />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default Main;
