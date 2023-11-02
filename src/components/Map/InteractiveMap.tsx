import React, { useRef, useEffect, useState, useContext } from 'react';
import * as d3 from 'd3';
import { Area, Room } from '../../data/Map';
import MapContext from '../../contexts/MapContext';
import ConnectionRenderer from './ConnectionRenderer';
import RoomRenderer from './RoomRenderer';

type Props = {
  area?: Area;
};

const InteractiveMap: React.FC<Props> = ({area}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room>();
    const [zLevel, setZLevel] = useState<number>(0);
    const {rooms} = useContext(MapContext);

    useEffect(() => {
      if (!area)
        return;
      const minZ = Math.min(...Object.values(rooms).map((room) => area.rooms[room.id].z));
      setZLevel(minZ);
    }, [area, rooms]);

    useEffect(() => {
        if (!svgRef.current) return;

        // Define the zoom behavior
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 5])
            .filter((event) => {
              // Prevent zoom on double click
              if (event.type === 'dblclick') event.preventDefault();
                return !event.ctrlKey && !(event.type === 'dblclick');
            })
            .on("zoom", (event) => {
                const { transform } = event;
                d3.select(svgRef.current)
                    .select("g")
                    .attr("transform", transform);
            });

        // Attach the zoom behavior to the svg
        d3.select(svgRef.current).call(zoom);

        // Get bounding box of the container and adjust zoom accordingly
        // Note: This starts us fully zoomed out.
        d3.select(svgRef.current)
          .call(zoom.transform, d3.zoomIdentity.scale(0.5));
    }, []);

    console.log(area);
    if (!area)
      return null;

    const filteredRooms = Object.keys(area.rooms)
      .map(roomIdStr => rooms[Number(roomIdStr)]);
    console.log(filteredRooms);
    return (
    <svg ref={svgRef} width="100%" height="100%" className="noDrag">
      <g>
        <ConnectionRenderer area={area} rooms={filteredRooms} nodeSize={100} z={zLevel} />
        <RoomRenderer area={area} rooms={filteredRooms} nodeSize={100} z={zLevel} selected={selectedRoom} onRoomSelected={(r) => setSelectedRoom(r)}/>
      </g>
    </svg>
  );
};

export default InteractiveMap;