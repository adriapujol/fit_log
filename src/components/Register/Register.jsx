import React, { useRef } from 'react';
import './Register.scss';
import barbellLogo from '../../img/barbell_logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';


function Register() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    const handleSubmit = e => {
        e.preventDefault();

        signup(emailRef.current.value, passwordRef.current.value)
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
                <form className="login-form">
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
                    <button className="login-btn" type="submit">Register</button>

                    <div className="no-account">
                        <p>Already have an account?  <Link to="/fit_log/login" className="sign-link">Log in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
