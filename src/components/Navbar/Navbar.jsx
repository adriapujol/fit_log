import React, { useState } from 'react';
import './Navbar.scss';
import navbarItems from './navbarItem.json';
import { Link } from "react-router-dom";


function Navbar({ setViewWorkouts }) {

    const [isClicked, setIsClicked] = useState(false);

    //ACCESS WORKOUTS LIST OR EXERCISES LIST

    const handleLinks = () => {
        // if (e.target.textContent === "Workouts") {
        //     setViewWorkouts(true);
        // } else {
        //     setViewWorkouts(false);
        // }
        setIsClicked(false);
    }

    return (
        <nav className="navbar">
            <div className="menu-icon" onClick={() => setIsClicked(!isClicked)}>
                <i className={isClicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={isClicked ? "nav-menu active" : "nav-menu"}>
                <li >
                    <Link to={"/workouts"} className="nav-links" onClick={handleLinks}>Workouts</Link>
                </li>
                <li>
                    <Link to="/exercises" className="nav-links" onClick={handleLinks}>Exercises</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
