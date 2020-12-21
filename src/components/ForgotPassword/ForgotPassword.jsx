import React, { useRef, useState } from 'react';
import '../Login/Login.scss';
import barbellLogo from '../../img/barbell_logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';



function ForgotPassword() {


    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setLoading(false);
            setMessage("Check your inbox for further instructions");
            setShowMessage(true)
        } catch {
            setLoading(false);
            setMessage("Failed to reset password");
            setShowMessage(true);
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
                    <div className={showMessage ? "alert" : "alert hide-message"}>{message}</div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="login-input"
                        ref={emailRef}
                        required
                    />
                    <button className="login-btn" type="submit" disabled={loading}>Password Reset</button>
                    <div className="forgot-password">
                        <Link to="/fit_log/login">Log in</Link>
                    </div>
                    <div className="no-account">
                        <p>Don't have an account? <Link to="/fit_log/register" className="sign-link">Try it for free</Link></p>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ForgotPassword;

