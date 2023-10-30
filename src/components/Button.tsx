import React from 'react';
import './Button.css';

interface SquareButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<SquareButtonProps> = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
