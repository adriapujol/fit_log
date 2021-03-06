import React, { useRef, useState } from 'react';
import '../Login/Login.scss';
import barbellLogo from '../../img/barbell_logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';



function Register() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(false);

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setShowError(true);
            return setError("Passwords do not match");
        }
        if (passwordRef.current.value.length < 6) {
            setShowError(true);
            return setError("Password has to be 6 characters or longer");
        }
        try {
            setError("");
            
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push("/");
        } catch {
            setLoading(false);
            setError("Failed to create an account");
            setShowError(true);
        }

    }

    return (
        <div className="landing-page">
            <div className="landing-content color-overlay">
                <div className="landing-logo">
                    <img src={barbellLogo} alt="logo" />
                    <div className="logo-text">
                        <div className="logo-title">GYM LOG</div>
                        <div className="logo-subtitle">Track your lifts</div>
                    </div>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className={showError ? "alert" : "alert hide-message"}>{error}</div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="login-input"
                        ref={emailRef}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="login-input"
                        ref={passwordRef}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Confirm password"
                        className="login-input"
                        ref={passwordConfirmRef}
                        required
                    />
                    <button className="login-btn" type="submit" disabled={loading}>Register</button>

                    <div className="no-account">
                        <p>Already have an account?  <Link to="/login" className="sign-link">Log in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
