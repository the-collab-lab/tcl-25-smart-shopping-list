import React from 'react';

const Dialog = ({ onCancel, onDelete }) => (
  <>
    <div className="dialog-wrapper" aria-hidden="true"></div>
    <div id="dialog" role="dialog" aria-labelledby="dialog">
      <div className="dialog__inner">
        <p id="dialog-content">Are you sure you want to delete this item?</p>
        <div className="btn-container">
          <button onClick={onDelete} className="btn yes-button">
            Yes
          </button>
          <button onClick={onCancel} className="btn cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </>
);

export default Dialog;
