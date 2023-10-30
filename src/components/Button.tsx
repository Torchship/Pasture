import React from 'react';
import './Button.css';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, children, style, className }) => {
  return (
    <button onClick={onClick} className={`button ${className}`} style={style}>
      {label || children}
    </button>
  );
};

export default Button;
