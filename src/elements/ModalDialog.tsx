import React from 'react';
import './ModalDialog.css';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: (button: string) => void;
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  buttons?: string[]
}

const ModalDialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  title,
  children,
  style,
  buttons = ['Close']
}) => {
  if (!isOpen) return null;

  const handleButtonClick = (button: string) => {
    onClick?.(button);
    if (button === 'Close') {
        onClose?.();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-background" style={style}>
        <div className="modal">
          <div></div> {/* This is needed to utilize its pseudo-elements for the bottom corners */}
          <div className="modal-header">
            <h1>{title}</h1>
          </div>
          <div className="modal-content">
            {children}
          </div>
          <div className="modal-footer">
            {buttons.map(b => {
              return (
                <Button key={b} label={b} onClick={() => handleButtonClick(b)}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
