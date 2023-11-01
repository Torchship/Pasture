import { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Header } from "../elements/Header";
import { Container } from "../elements/Container";
import Dropdown from "../elements/Dropdown";
import PropertiesPanel from "./PropertiesPanel";
// import TerminalPanel from "./TerminalPanel";
import AreasPanel from "./AreasPanel";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const height = (containerHeight || 0) / 12;

  return (
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
              {/* <MapContext>
                <InteractiveMap />
              </MapContext> */}
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
            {/* <TerminalPanel messages={messages}/> */}
          </div>
          <div key="areas" style={{display: 'flex', flexDirection: 'column'}}>
            <AreasPanel />
          </div>
        </ResponsiveGridLayout>
      </div>
  )
}
export default Dashboard;