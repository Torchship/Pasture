import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export type Room = {
  x: number;
  y: number;
  z: number;
  name: string;
  objid: number;
  exits: number[];  // Exits which correspond to objid of other rooms
};

interface MapViewProps {
  rooms: Room[];
}

const MapView: React.FC<MapViewProps> = ({ rooms }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const selectedColor = "#ff0000";  // Color to indicate a selected room or line

  useEffect(() => {
    if (!svgRef.current) return;

    // A set to track the drawn connections
    const drawnConnections = new Set<string>();

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous SVG content

    // const width = window.innerWidth;
    // const height = window.innerHeight;

    const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 5])
    .filter(event => {
      // Prevent zoom on double click
      if (event.type === 'dblclick') event.preventDefault();
      return !event.ctrlKey && !(event.type === 'dblclick');
    })
    .on('zoom', (event) => {
      svg.selectAll('g').attr('transform', event.transform.toString());
    });

    const container = svg.append('g');

    // First, draw all connections
    rooms.forEach(room => {
        room.exits.forEach(exitObjId => {
          const targetRoom = rooms.find(r => r.objid === exitObjId);
          if (targetRoom) {
            // Create a unique identifier for the connection
            const connectionId = room.objid < targetRoom.objid 
              ? `${room.objid}-${targetRoom.objid}`
              : `${targetRoom.objid}-${room.objid}`;
  
            if (!drawnConnections.has(connectionId)) {
              container.append('line')
                .attr('x1', room.x * 200 + 50) // Center of the room
                .attr('y1', room.y * 200 + 50) // Center of the room
                .attr('x2', targetRoom.x * 200 + 50) // Center of the target room
                .attr('y2', targetRoom.y * 200 + 50) // Center of the target room
                .attr('stroke', '#576C6E')
                .attr('stroke-width', 2)
                .on('click', function() {
                    d3.select(this).attr('stroke', selectedColor);
                    // Here, you can also handle other actions upon line selection
                    console.log(connectionId);
                    });
                
  
              drawnConnections.add(connectionId);
            }
          }
        });
      });

     // Then, draw all rooms
     rooms.forEach(room => {
        container.append('rect')
          .attr('x', room.x * 200)
          .attr('y', room.y * 200)
          .attr('width', 100)
          .attr('height', 100)
          .attr('fill', 'lightgray')
          .attr('stroke', '#576C6E')
          .on('click', function() {
            d3.select(this).attr('stroke', selectedColor);
            // Here, you can also handle other actions upon room selection
            console.log('test');
          });
  
        container.append('text')
          .attr('x', room.x * 200 + 50)
          .attr('y', room.y * 200 + 50)
          .attr('dy', '0.35em')
          .attr('text-anchor', 'middle')
          .text(room.name);
      });
  
      svg.call(zoom);
  
    }, [rooms]);

  return (
    <svg ref={svgRef} width="100%" height="100%" />
  );
}

export default MapView;
