import React, { useState } from 'react';
import './Dropdown.css';
import Button from './Button';

interface DropdownProps {
  label: string;
  options: string[]; // Array of dropdown options
  onSelect: (selectedOption: string) => void; // Callback for when an option is selected
  style?: React.CSSProperties;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  className,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown-container noDrag ${className}`} style={style}>
      <Button label={label} onClick={toggleDropdown} />
      {isOpen && (
        <ul className="dropdown-menu noDrag">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false); // Close the dropdown after selecting an option
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
