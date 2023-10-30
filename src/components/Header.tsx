import React from 'react';
import './Header.css';

type Props = {
  title?: string;
  subtitle?: string;
};

export const Header: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="header-box">
      <div className="content">
        <span>{title}</span>
        <span>{subtitle}</span>
      </div>
      <div className="footer"></div>
    </div>
  );
};
