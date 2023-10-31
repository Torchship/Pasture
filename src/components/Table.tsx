import React from 'react';
import './Table.css';

interface TableProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, style, className }) => {
  return (
    <div className="table-container">
      <table className={`table ${className}`} style={style}>
        <tr>
          <th>Test</th>
        </tr>
        {children}
      </table>
    </div>
  );
};

export default Table;
