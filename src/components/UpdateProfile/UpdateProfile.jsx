import React, { useRef, useState } from 'react';
import './UpdateProfile.scss';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';



function UpdateProfile() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setShowError(true);
            return setError("Passwords do not match");
        }
        
        const promises = [];
        setLoading(true);
        setError("");
        setShowError(false);


        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            setLoading(false);
            history.push("/fit_log/")
        }).catch(() => {
            setError("Failed to update account")
            setShowError(true);
            setLoading(false);
        })

    }

    return (
        <div className="content center-content">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Update Profile</h2>
                {<div className={showError ? "update_alert" : "update_alert hidden"}>{error}</div>}
                <label className="email-label">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="login-input"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                />
                <div className="password-field">
                    <label className="password-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep the same"
                        className="login-input"
                        ref={passwordRef}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep the same"
                        className="login-input"
                        ref={passwordConfirmRef}
                    />
                    <div className="password-guideline">Password has to be 6 characters or longer</div>
                </div>
                <button className="login-btn" type="submit" disabled={loading}>Update</button>

                <div className="no-account">
                    <Link to="/fit_log/" className="sign-link">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile;

