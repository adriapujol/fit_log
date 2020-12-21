import React, { useState } from 'react';
import './Dashboard.scss';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { db } from '../../Firebase';


function Dashboard() {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [error, setError] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("Delete my account");
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const { currentUser, logout, deleteUser } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        setError("");
        try {
            await logout();
            history.push('/fit_log/login');
        } catch {
            setError("Failed to log out");
        }
    }

    const handleDeleteUser = async () => {
        setError("");
        try {
            let userUID = currentUser.uid;
            db.collection(`users/${userUID}/data/`).doc('workouts').delete();
            db.collection(`users/${userUID}/data/`).doc('exercises').delete();
            db.collection(`users`).doc(userUID).delete();
            await deleteUser();
        } catch {
            setError("Couldn't delete user")
        }
    }

    const handleConfirmDelete = () => {
        setDeleteMessage("Are you sure? Click me");
        setShowDeleteAccount(true);
    }

    return (
        <div className="content dashboard">
            {showConfirmModal && <ConfirmModal message="There is no going back" onConfirm={handleDeleteUser} onCancel={() => setShowConfirmModal(false)} />}
            <div className="profile-card">
                <h3>Profile</h3>
                <div className="user-email">
                    <strong>Email: </strong>{currentUser.email}
                </div>
                <Link to="/fit_log/workouts" className="my-links">Workouts</Link>
                <Link to="/fit_log/exercises" className="my-links">Exercises</Link>
                <Link to="/fit_log/update-profile" className="update-link">Update profile</Link>
            </div>
            <button className="btn profile-btn" onClick={handleLogout}>Log out</button>
            <div className="delete-user-box">
                <div className="delete-user" onClick={showDeleteAccount? handleDeleteUser : handleConfirmDelete}>{deleteMessage}</div>
                <div className={showDeleteAccount ? "delete-user-warning" : "delete-user-warning hide" }>There is no going back</div>
            </div>
            {error && <div>{error}</div>}
        </div>
    )
};


export default Dashboard
