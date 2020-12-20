import React, { useRef, useState } from 'react';
import './Login.scss';
import barbellLogo from '../../img/barbell_logo.png';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';



function Login() {


    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setShowError(false);
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push("/fit_log/");
        } catch {
            setLoading(false);
            setError("Failed to log in");
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

                    <button className="login-btn" type="submit" disabled={loading}>Log in</button>
                    <div className="forgot-password">
                        <Link to="/fit_log/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="no-account">
                        <p>Don't have an account? <Link to="/fit_log/register" className="sign-link">Try it for free</Link></p>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login;
