import React from 'react';
import { Area, Room } from '../../data/Map';

interface RoomRendererProps {
  area: Area;
  rooms: Room[];
  nodeSize: number;
  z: number;
  onRoomSelected?: (room: Room) => void;
  selected?: Room;
}

const RoomRenderer: React.FC<RoomRendererProps> = ({ area, rooms, nodeSize, z, onRoomSelected, selected }) => {
    const maxY = Math.max(...Object.values(rooms).filter(room => area.rooms[room.id].z === z).map((room) => area.rooms[room.id].y));

    return (
    <>
        {/* This renders all of the base map rectangles */}
        {Object.entries(rooms).map(([roomIdStr, room]) => {
            const x = area.rooms[room.id].x;
            const y = area.rooms[room.id].y;
            return (
                <rect 
                    key={room.id + '-rect'}
                    x={x * (nodeSize * 2)} 
                    y={(maxY - y) * (nodeSize * 2)}
                    width={nodeSize}
                    height={nodeSize}
                    fill={'lightGrey'}
                    stroke={room === selected ? 'red' : '#576C6E'}
                    onClick={() => onRoomSelected?.(room) }>
                </rect>
            )
        })}
        {/* This renders all of the rect titles */}
        {Object.entries(rooms).map(([roomIdStr, room]) => {
            const x = area.rooms[room.id].x;
            const y = area.rooms[room.id].y;
            return (
                <text
                    key={room.id + '-text'}
                    x={x * (nodeSize * 2) + (nodeSize / 2)}
                    y={(maxY - y) * (nodeSize * 2) + (nodeSize / 2)}
                    dy={'0.35em'}
                    textAnchor={'middle'}>
                    {`[${x}, ${y}]`}
                </text>
            );
        })}
    </>
  );
};

export default RoomRenderer;