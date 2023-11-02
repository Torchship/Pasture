import React from 'react';
import './Button.css';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  selected?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, children, style, className, selected = false }) => {
  return (
    <button onClick={onClick} className={`button noDrag ${selected ? 'selected' : ''} ${className}`} style={style}>
      {label || children}
    </button>
  );
};

export default Button;
