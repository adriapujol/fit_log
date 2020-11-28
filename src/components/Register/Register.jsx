import React from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';


function Register() {
    return (
        <form className="login-form">
            <input
                type="text"
                name="username"
                placeholder="Username"
                className="login-input"
            />
            <p className="error-message">* Wrong user name</p>
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
            />
            <p className="error-message">* Wrong password</p>
            <input
                type="password"
                name="password"
                placeholder="Confirm password"
                className="login-input"
            />
            <p className="error-message">* Wrong password</p>
            <button className="login-btn">Register</button>

            <div className="no-account">
                <p>Already have an account?  <Link to="" className="sign-link">Login</Link></p>
            </div>
        </form>
    )
}

export default Register;
