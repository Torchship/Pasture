export {};
// import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';

// export type SelectedElement = {
//   type: string;
//   id: number;
// };

// interface MapViewProps {
//   rooms: Room[];
//   onSelected: (selectedElement: SelectedElement) => void;
// }

// const MapView: React.FC<MapViewProps> = ({ rooms, onSelected }) => {
//   const [isZoomSet, setIsZoomSet] = useState(false);
//   const [selectedElement, setSelectedElement] =
//     useState<SelectedElement | null>(null);
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   const selectedColor = '#ff0000'; // Color to indicate a selected room or line
//   const maxY = Math.max(...rooms.map((room) => room.y));

//   const handleRoomClick = (room: Room) => {
//     setSelectedElement({
//       type: 'room',
//       id: room.id,
//     });
//     onSelected({
//       type: 'room',
//       id: room.id,
//     }); // Call the onSelected prop to bubble up the selected room
//   };

//   useEffect(() => {
//     if (!svgRef.current) return;

//     // A set to track the drawn connections
//     const drawnConnections = new Set<string>();

//     const svg = d3.select(svgRef.current);
//     const container = svg.select('g');
//     svg.selectAll('*').remove(); // Clear previous SVG content

//     const zoom = d3
//       .zoom<SVGSVGElement, unknown>()
//       .scaleExtent([0.5, 5])
//       .filter((event) => {
//         // Prevent zoom on double click
//         if (event.type === 'dblclick') event.preventDefault();
//         return !event.ctrlKey && !(event.type === 'dblclick');
//       })
//       .on('zoom', (event) => {
//         svg.selectAll('g').attr('transform', event.transform.toString());
//       });

//     // First, draw all connections
//     rooms.forEach((room) => {
//       room.exits?.forEach((exit) => {
//         const targetRoom = rooms.find((r) => r.id === exit.dest);
//         if (targetRoom) {
//           // Create a unique identifier for the connection
//           const connectionId =
//             room.id < targetRoom.id
//               ? `${room.id}-${targetRoom.id}`
//               : `${targetRoom.id}-${room.id}`;

//           if (!drawnConnections.has(connectionId)) {
//             container
//               .append('line')
//               .attr('x1', room.x * 200 + 50) // Center of the room
//               .attr('y1', (maxY - room.y) * 200 + 50) // Center of the room
//               .attr('x2', targetRoom.x * 200 + 50) // Center of the target room
//               .attr('y2', (maxY - targetRoom.y) * 200 + 50) // Center of the target room
//               .attr('stroke', '#576C6E')
//               .attr('stroke-width', 2)
//               .on('click', function () {
//                 d3.select(this).attr('stroke', selectedColor);
//                 // Here, you can also handle other actions upon line selection
//                 console.log(connectionId);
//               });

//             drawnConnections.add(connectionId);
//           }
//         }
//       });
//     });

//     // Then, draw all rooms
//     rooms.forEach((room) => {
//       container
//         .append('rect')
//         .attr('x', room.x * 200)
//         .attr('y', (maxY - room.y) * 200)
//         .attr('width', 100)
//         .attr('height', 100)
//         .attr('fill', 'lightgray')
//         .attr('stroke', '#576C6E')
//         .on('click', function () {
//           d3.select(this).attr('stroke', selectedColor);
//           handleRoomClick(room);
//           // Here, you can also handle other actions upon room selection
//           // console.log('test');
//         });

//       container
//         .append('text')
//         .attr('x', room.x * 200 + 50)
//         .attr('y', (maxY - room.y) * 200 + 50)
//         .attr('dy', '0.35em')
//         .attr('text-anchor', 'middle')
//         .text(`[${room.x}, ${room.y}]`);
//     });

//     // Draw Exit Nodes
//     rooms.forEach((room) => {
//       room.exits?.forEach((exit) => {
//         const position = calculateCorner(stringToCardinalDirection(exit.name));
//         container
//           .append('rect')
//           .attr('x', position.x + room.x * 200 - 10)
//           .attr('y', position.y + (maxY - room.y) * 200 - 10)
//           .attr('width', 20)
//           .attr('height', 20)
//           .attr('fill', 'lightgray')
//           .attr('stroke', 'black');

//         container
//           .append('text')
//           .attr('x', position.x + room.x * 200)
//           .attr('y', position.y + (maxY - room.y) * 200)
//           .attr('dy', '0.35em')
//           .attr('text-anchor', 'middle')
//           .style('font-size', '12px')
//           .text(`${exit.aliases?.[0]}`);
//       });
//     });

//     // Get bounding box of the container and adjust zoom accordingly
//     svg.call(zoom.transform, d3.zoomIdentity.scale(0.5));

//     // Set zoom behavior only once
//     if (!isZoomSet && svgRef.current) {
//       svg.call(zoom);
//       setIsZoomSet(true);
//     }
//   }, [rooms]);

//   return (
//     <svg ref={svgRef} width="100%" height="100%">
//       <g>

//       </g>
//     </svg>
//   );
// };

// export default MapView;
