// import React from 'react';
// import { Room } from '../../data/Map';

// interface RoomRendererProps {
//   rooms: Room[];
//   nodeSize: number;
//   z: number;
//   onRoomSelected?: (room: Room) => void;
//   selected?: Room;
// }

// const RoomRenderer: React.FC<RoomRendererProps> = ({ rooms, nodeSize, z, onRoomSelected, selected }) => {
//     const maxY = Math.max(...rooms.filter(room => room.z === z).map((room) => room.y));

//     return (
//     <>
//         {/* This renders all of the base map rectangles */}
//         {rooms.map(r => {
//             return (
//                 <rect 
//                     key={r.id + '-rect'}
//                     x={r.x * (nodeSize * 2)} 
//                     y={(maxY - r.y) * (nodeSize * 2)}
//                     width={nodeSize}
//                     height={nodeSize}
//                     fill={'lightGrey'}
//                     stroke={r === selected ? 'red' : '#576C6E'}
//                     onClick={() => onRoomSelected?.(r) }>
//                 </rect>
//             )
//         })}
//         {/* This renders all of the rect titles */}
//         {rooms.map(r => {
//             return (
//                 <text
//                     key={r.id + '-text'}
//                     x={r.x * (nodeSize * 2) + (nodeSize / 2)}
//                     y={(maxY - r.y) * (nodeSize * 2) + (nodeSize / 2)}
//                     dy={'0.35em'}
//                     textAnchor={'middle'}>
//                     {`[${r.x}, ${r.y}]`}
//                 </text>
//             );
//         })}
//     </>
//   );
// };

// export default RoomRenderer;
export {}