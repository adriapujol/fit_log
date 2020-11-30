import React from 'react';
import './Register.scss';
import barbellLogo from '../../img/barbell_logo.png';
import { Link } from 'react-router-dom';


function Register() {
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
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Confirm password"
                        className="login-input"
                    />
                    <button className="login-btn">Register</button>

                    <div className="no-account">
                        <p>Already have an account?  <Link to="/fit_log/login" className="sign-link">Log in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
