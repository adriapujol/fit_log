import React, { useState } from 'react';
import './Navbar.scss';
import navbarItems from './navbarItem.json';

function Navbar({ setViewWorkouts }) {

    const [isClicked,setIsClicked] = useState(false);

    //ACCESS WORKOUTS LIST OR EXERCISES LIST

    const handleLinks = e => {
        if (e.target.textContent === "Workouts") {
            setViewWorkouts(true);
        } else {
            setViewWorkouts(false);
        }
        setIsClicked(false);
    }

    return (
        <nav className="navbar">
            <div className="menu-icon" onClick={() => setIsClicked(!isClicked)}>
                <i className={ isClicked ? "fas fa-times" : "fas fa-bars" }></i>
            </div>
            <ul className={ isClicked ? "nav-menu active" : "nav-menu"}>
                {navbarItems.map((item, index)=> {
                    return <li key={index}><a className={item.cName} href={item.url} onClick={handleLinks}>{item.title}</a></li>
                })}
            </ul>
        </nav>
    )
}

export default Navbar;
