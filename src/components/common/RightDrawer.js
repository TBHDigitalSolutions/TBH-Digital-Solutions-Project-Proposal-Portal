import React from 'react';

const RightDrawer = ({ isOpen, onClose }) => {
  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : 'drawer-close'}`}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary" onClick={onClose}>Open Drawer</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={onClose}></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <button onClick={() => window.open('/assets/step7/files/AEI - Project Proposal.html', '_blank')}>
              View Proposal
            </button>
          </li>
          <li>
            <button onClick={() => window.location.href = '/assets/proposals/Andover_Eye_Institute_Proposal.pdf'}>
              Download Proposal
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightDrawer;
