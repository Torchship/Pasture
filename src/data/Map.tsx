export type Room = {
  name: string;
  areas?: Area[];
  id: number;
  exits?: Exit[];
};

export type Vector3 = {
  x: number;
  y: number;
  z: number;
}

export type Area = {
  id: number;
  name: string;
  zone?: string;
  rooms?: { [id: number]: Vector3 };
};

export type Exit = {
  id: number;
  source: number;
  dest: number;
  name: string;
  aliases?: string[];
};

// Define the cardinal directions as an enum
export enum CardinalDirection {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
  NORTHEAST = 'NORTHEAST',
  SOUTHEAST = 'SOUTHEAST',
  SOUTHWEST = 'SOUTHWEST',
  NORTHWEST = 'NORTHWEST',
}

// Calculate the corner for drawing the box based on the direction
export function calculateCorner(direction: CardinalDirection): Array<number> {
  switch (direction) {
    case CardinalDirection.NORTH:
      return [ 50,  0 ]; // Top middle
    case CardinalDirection.EAST:
      return [ 100, 50 ]; // Middle right
    case CardinalDirection.SOUTH:
      return [ 50, 100 ]; // Bottom middle
    case CardinalDirection.WEST:
      return [ 0, 50 ]; // Middle left
    case CardinalDirection.NORTHEAST:
      return [ 100, 0 ]; // Top right
    case CardinalDirection.SOUTHEAST:
      return [ 100, 100 ]; // Bottom right
    case CardinalDirection.SOUTHWEST:
      return [ 0, 100 ]; // Bottom left
    case CardinalDirection.NORTHWEST:
      return [ 0, 0 ]; // Top left
    default:
      throw new Error('Invalid direction');
  }
}

export function stringToCardinalDirection(directionStr: string): CardinalDirection {
  const uppercasedDirection = directionStr.toUpperCase();

  if (!(uppercasedDirection in CardinalDirection)) {
    throw new Error('Invalid direction string');
  }

  return CardinalDirection[
    uppercasedDirection as keyof typeof CardinalDirection
  ];
}