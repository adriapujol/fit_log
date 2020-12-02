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
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
        // if (passwordRef.current.value.length < 6) {
        //     return setError("Password has to be 6 characters or longer");
        // }

        const promises = [];
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
        history.push("/fit_log/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false);
        })

    }

    return (
        <div className="content">
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <div className="alert">{error}</div>}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="login-input"
                        ref={emailRef}
                        required
                        defaultValue={currentUser.email}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep the same"
                        className="login-input"
                        ref={passwordRef}
                    />
                    <p>Password has to be 6 characters or longer</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep the same"
                        className="login-input"
                        ref={passwordConfirmRef}
                    />
                    <button className="login-btn" type="submit" disabled={loading}>Update</button>

                    <div className="no-account">
                        <Link to="/fit_log/" className="sign-link">Cancel</Link>
                    </div>
                </form>
        </div>
    )
}

export default UpdateProfile;

