import React from 'react';
import './LandingPage.scss';
import { Link } from 'react-router-dom';
import barbellLogo from '../../img/barbell_logo.png';
import Login from '../Login/Login';
import Register from '../Register/Register';

function LandingPage() {
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
                <Register />
        </div>

        </div >
    )
}

export default LandingPage;
