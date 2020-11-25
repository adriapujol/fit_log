import React from 'react';
import './Login.scss';
import barbellLogo from '../../img/barbell_logo.png';

function Login() {
    return (
        <div className="login">
            <div className="login-logo">
                <img src={barbellLogo} />
                <div className="logo-text">
                    <div className="logo-title">GYM LOG</div>
                    <div className="logo-subtitle">Track your lifts</div>
                </div>
            </div>

            <form action="">
                <input type="text"/>
                <input type="text"/>

                <button className="btn-login">Login</button>
            </form>
            
        </div>
    )
}

export default Login
