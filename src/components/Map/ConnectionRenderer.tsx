import React from 'react';
import { Room } from '../../data/Map';

interface ConnectionRendererProps {
  rooms: Room[];
  nodeSize: number;
  z: number;
}

const ConnectionRenderer: React.FC<ConnectionRendererProps> = ({ rooms, nodeSize, z }) => {
    const maxY = Math.max(...rooms.filter(room => room.z === z).map((room) => room.y));
    const drawnConnections = new Set<string>();

    return (
    <>
        {rooms.map(room => {
            return (
                <>
                    {room.exits?.map((exit) => {
                        const targetRoom = rooms.find((r) => r.id === exit.dest);
                        if (targetRoom) {
                            // Create a unique identifier for the connection
                            const connectionId =
                                room.id < targetRoom.id
                                    ? `${room.id}-${targetRoom.id}`
                                    : `${targetRoom.id}-${room.id}`;
                            if (drawnConnections.has(connectionId))
                                return null;
                            
                            drawnConnections.add(connectionId);
                            return (
                                <line
                                    x1={room.x * (nodeSize * 2) + (nodeSize / 2)}
                                    y1={(maxY - room.y) * (nodeSize * 2) + (nodeSize / 2)}
                                    x2={targetRoom.x * (nodeSize * 2) + (nodeSize / 2)}
                                    y2={(maxY - targetRoom.y) * (nodeSize * 2) + (nodeSize / 2)}
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
