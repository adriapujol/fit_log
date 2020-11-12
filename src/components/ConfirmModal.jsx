import React from 'react';

function ConfirmModal(props) {
    return (
        <div className="modal">
            <form className="modal-form">
                <div className="close-modal" onClick={props.onClose}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="confirm-title">
                    Are you sure?
                </div>
                <div className="confirm-text">
                    {props.message}
                </div>
                <div className="confirm-cancel-btn-box">
                    <button className="btn cancel-btn" onClick={props.onCancel}>Cancel</button>
                    <button className="btn" onClick={props.onConfirm}>Confirm</button>
                </div>
            </form>
        </div>
    )
}

export default ConfirmModal;
