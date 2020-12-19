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
        console.log("test")
        // let dbRef = db.collection('test').doc(currentUser.uid);
        // console.log(dbRef);
        // console.log(currentUser.uid)
        // dbRef.delete().then(()=>console.log("delete success")).catch(err => console.log(err))
        // db.collection(`test/${currentUser.uid}/data/`).doc('workouts').delete();
        // db.collection(`test`).doc('test').delete();

        // db.collection("test").doc(currentUser.uid).delete()
        try {
            console.log("user to delete: ", currentUser.uid)
            let userUID = currentUser.uid;
            db.collection(`test/${userUID}/data/`).doc('workouts').delete();
            db.collection(`test/${userUID}/data/`).doc('exercises').delete();
            db.collection(`test`).doc(userUID).delete();
            // currentUser.delete();
            await deleteUser();
        } catch {
            setError("Couldn't delete user.")
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
                {error && <div>{error}</div>}
                <div>
                    <strong>Email: </strong>{currentUser.email}
                </div>
                <Link to="/fit_log/update-profile" className="btn">Update profile</Link>
            </div>
            <button className="btn" onClick={handleLogout}>Log out</button>
            <div className="delete-user-box">
                <div className="delete-user" onClick={showDeleteAccount? handleDeleteUser : handleConfirmDelete}>{deleteMessage}</div>
                <div className={showDeleteAccount ? "delete-user-warning" : "delete-user-warning hide" }>There is no going back</div>
            </div>
        </div>
    )
};


export default Dashboard
