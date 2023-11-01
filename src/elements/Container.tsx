import React from 'react';
import './Container.css';

type Props = {
  children?: React.ReactNode;
  showBorder?: boolean;
  className?: string;
};

export const Container: React.FC<Props> = ({ children, className, showBorder = true}) => {
  return (
    <div className="container">
      <div className={`container-content ${showBorder ? 'container-border' : ''} ${className}`}>
        {children}
      </div>
    </div>
  );
};
