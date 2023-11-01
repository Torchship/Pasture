import React from 'react';
import './Header.css';

type Props = {
  title?: string;
  subtitle?: string;
  style?: React.CSSProperties;
};

export const Header: React.FC<Props> = ({ title, subtitle, style }) => {
  return (
    <div className="header-box" style={style}>
      <div className="content">
        <span>{title}</span>
        <span>{subtitle}</span>
      </div>
      <div className="footer"></div>
    </div>
  );
};
