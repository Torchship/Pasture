// import React, { useRef, useEffect, useState, useContext } from 'react';
// import * as d3 from 'd3';
// import { Room } from '../../data/Map';
// import RoomRenderer from './RoomRenderer';
// import ConnectionRenderer from './ConnectionRenderer';
// import MapContext from '../../contexts/MapContext';

// const InteractiveMap: React.FC = () => {
//     const context = useContext(MapContext);

//     if (!context) {
//       throw new Error("Component must be wrapped within a MapProvider");
//     }
    
//     const { rooms, setRooms } = context;
//     const svgRef = useRef<SVGSVGElement | null>(null);
//     const [selectedRoom, setSelectedRoom] = useState<Room>();

//     useEffect(() => {
//         if (!svgRef.current) return;

//         // Define the zoom behavior
//         const zoom = d3.zoom<SVGSVGElement, unknown>()
//             .scaleExtent([0.5, 5])
//             .filter((event) => {
//               // Prevent zoom on double click
//               if (event.type === 'dblclick') event.preventDefault();
//                 return !event.ctrlKey && !(event.type === 'dblclick');
//             })
//             .on("zoom", (event) => {
//                 const { transform } = event;
//                 d3.select(svgRef.current)
//                     .select("g")
//                     .attr("transform", transform);
//             });

//         // Attach the zoom behavior to the svg
//         d3.select(svgRef.current).call(zoom);

//         // Get bounding box of the container and adjust zoom accordingly
//         // Note: This starts us fully zoomed out.
//         d3.select(svgRef.current)
//           .call(zoom.transform, d3.zoomIdentity.scale(0.5));
//     }, []);

//     return (
//     <svg ref={svgRef} width="100%" height="100%">
//       <g>
//         <ConnectionRenderer rooms={rooms} nodeSize={100} z={0} />
//         <RoomRenderer rooms={rooms} nodeSize={100} z={0} selected={selectedRoom} onRoomSelected={(r) => setSelectedRoom(r)}/>
//       </g>
//     </svg>
//   );
// };

// export default InteractiveMap;
export {};