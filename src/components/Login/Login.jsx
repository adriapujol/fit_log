import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import barbellLogo from '../../img/barbell_logo.png';

function Login() {
    return (
        <div className="login">
            <div className="login-content color-overlay">
                <div className="login-logo">
                    <img src={barbellLogo} alt="logo" />
                    <div className="logo-text">
                        <div className="logo-title">GYM LOG</div>
                        <div className="logo-subtitle">Track your lifts</div>
                    </div>
                </div>

                <form className="login-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="login-input"
                    />
                    <button className="login-btn">Login</button>

                    <div className="no-account">
                        <div>
                            <p>Don't have an account? <Link to="" className="sign-link">Try it for free</Link></p>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
