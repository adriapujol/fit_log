import React from 'react';

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal">
            <form className="modal-form">
                <div className="close-modal" onClick={onCancel}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="confirm-title">
                    Are you sure?
                </div>
                <div className="confirm-text">
                    {message}
                </div>
                <div className="confirm-cancel-btn-box">
                    <button className="btn cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="btn" onClick={onConfirm}>Confirm</button>
                </div>
            </form>
        </div>
    )
}

export default ConfirmModal;
