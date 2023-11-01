import React from 'react';
import './ScrollableContainer.css';

type Props = {
  children?: React.ReactNode;
  maxHeight?: number;
};

export const ScrollableContainer: React.FC<Props> = ({ children, maxHeight = '100%'}) => {

  return (
    <div className="scrollable-container" style={{maxHeight: maxHeight}}>
      <div className={`scrollable-container-content`}>
        {children}
      </div>
    </div>
  );
};
