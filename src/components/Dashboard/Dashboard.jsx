import React, { useState } from 'react';
import './Dashboard.scss';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmModal from '../ConfirmModal/ConfirmModal';


function Dashboard() {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [error, setError] = useState("");
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
            await deleteUser();
        } catch {
            setError("Couldn't delete user.")
        }
    }

    return (
        <div className="content dashboard">
            {showConfirmModal && <ConfirmModal message="There is no going back" onConfirm={handleDeleteUser} onCancel={() => setShowConfirmModal(false)} />}
            <div className="profile-card">
                <h3>Profile</h3>
                {error && <div>{error}</div>}
                <div>
                    <strong>Email: </strong>{currentUser.email}
                </div>
                <Link to="/fit_log/update-profile" className="btn">Update profile</Link>
            </div>
            <button className="btn" onClick={handleLogout}>Log out</button>
            <div className="delete-user" onClick={()=> setShowConfirmModal(true)}>Delete my account</div>
        </div>
    )
};


export default Dashboard
