import React from 'react';
import { Area, Room } from '../../data/Map';

interface ConnectionRendererProps {
  rooms: Record<number, Room>;
  area: Area;
  nodeSize: number;
  z: number;
}

const ConnectionRenderer: React.FC<ConnectionRendererProps> = ({ rooms, area, nodeSize, z }) => {
    const maxY = Math.max(...Object.values(rooms).filter(room => area.rooms[room.id].z === z).map((room) => area.rooms[room.id].y));
    const drawnConnections = new Set<string>();

    return (
    <>
        {Object.entries(rooms).map(([roomIdStr, room]) => {
            return (
                <>
                    {room.exits?.map((exit) => {
                        const targetRoom = Object.values(rooms).find((r) => r.id === exit.dest);
                        if (targetRoom) {
                            // Create a unique identifier for the connection
                            const connectionId =
                                room.id < targetRoom.id
                                    ? `${room.id}-${targetRoom.id}`
                                    : `${targetRoom.id}-${room.id}`;
                            if (drawnConnections.has(connectionId))
                                return null;
                            
                            drawnConnections.add(connectionId);

                            const x = area.rooms[room.id].x;
                            const y = area.rooms[room.id].y;
                            const targetX = area.rooms[targetRoom.id].x;
                            const targetY = area.rooms[targetRoom.id].y;
                            return (
                                <line
                                    key={connectionId}
                                    x1={x * (nodeSize * 2) + (nodeSize / 2)}
                                    y1={(maxY - y) * (nodeSize * 2) + (nodeSize / 2)}
                                    x2={targetX * (nodeSize * 2) + (nodeSize / 2)}
                                    y2={(maxY - targetY) * (nodeSize * 2) + (nodeSize / 2)}
                                    stroke={'#576C6E'}
                                    strokeWidth={2}>
                                </line>
                            );
                        }
                    })}
                </>
            );
        })}
    </>
  );
};

export default ConnectionRenderer;