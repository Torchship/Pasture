import React, { useState } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
`;

const Cell = styled.div<{ selected: boolean }>`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  background-color: ${({ selected }) => (selected ? 'lightblue' : 'white')};
  cursor: pointer;
`;

type Props = {
  onCellSelect: (index: number) => void;
};

const Grid: React.FC<Props> = ({ onCellSelect }) => {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const handleCellClick = (index: number) => {
    setSelectedCell(index);
    onCellSelect(index);
  };

  return (
    <GridContainer>
      {Array.from({ length: 100 }).map((_, index) => (
        <Cell
          key={index}
          selected={index === selectedCell}
          onClick={() => handleCellClick(index)}
        />
      ))}
    </GridContainer>
  );
};

export default Grid;
