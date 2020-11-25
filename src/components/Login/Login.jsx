import React from 'react';
import './Login.scss';
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
                        type="password"
                        placeholder="Username"
                        className="login-input"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        className="login-input"
                    />
                    <button className="login-btn">Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login
