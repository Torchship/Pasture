import React from 'react';
import './ModalDialog.css';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

const ModalDialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-background">
        <div className="modal">
          <div></div> {/* This is needed to utilize its pseudo-elements for the bottom corners */}
          <div className="modal-header">
            <h1>{title}</h1>
          </div>
          <div className="modal-content">
            {children}
          </div>
          <div className="modal-footer">
            <Button label="Close"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
