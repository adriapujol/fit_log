import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';


function Login() {
    return (
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
                <p>Don't have an account? <Link to="" className="sign-link">Try it for free</Link></p>
            </div>
        </form>
    )
}

export default Login;
