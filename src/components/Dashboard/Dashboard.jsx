import React, { useState } from 'react';
import './Dashboard.scss';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
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

    return (
        <div className="content dashboard">
            <div className="profile-card">
                <h3>Profile</h3>
                {error && <div>{error}</div>}
                <div>
                    <strong>Email: </strong>{currentUser.email}
                </div>
                <Link to="/fit_log/update-profile" className="btn">Update profile</Link>
            </div>
            <button className="btn" onClick={handleLogout}>Log out</button>
        </div>
    )
};


export default Dashboard
