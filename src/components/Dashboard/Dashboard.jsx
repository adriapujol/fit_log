import React, { useState } from 'react';
import './Dashboard.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {

    const [error, setError] = useState("");
    const { currentUser } = useAuth();

    const handleLogout = () => {
        console.log("logging out");
    }

    return (
        <div className="content dashboard">
            <div className="profile-card">
                <h3>Profile</h3>
                {error && <div>{error}</div>}
                <div>
                    <strong>Email: </strong>{currentUser.email}
                </div>
            </div>
            <button className="btn" onClick={handleLogout}>Log out</button>
        </div>
    )
};


export default Dashboard
