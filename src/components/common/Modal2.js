// src/components/common/Modal2.js

import React, { useEffect, useRef } from 'react';

const Modal2 = ({ isOpen, onClose, children }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current.focus();
      document.body.classList.add('no-scroll'); // Lock scroll
    } else {
      document.body.classList.remove('no-scroll'); // Unlock scroll
    }

    return () => {
      document.body.classList.remove('no-scroll'); // Clean up scroll lock
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-content bg-white rounded-lg shadow-lg p-6 relative max-w-[90vw] max-h-[90vh]">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="modal-close-btn absolute top-4 right-4 text-xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="modal-body" id="modal-description">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal2;
