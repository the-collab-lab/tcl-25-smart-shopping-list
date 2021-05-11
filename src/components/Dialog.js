import React from 'react';

const Dialog = ({ onCancel, onDelete }) => (
  <div id="dialog">
    <div className="dialog__inner">
      <p id="dialog-content">Are you sure you want to delete this item?</p>
      <div className="btn-container">
        <button onClick={onDelete} className="btn">
          Yes
        </button>
        <button onClick={onCancel} className="btn">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default Dialog;