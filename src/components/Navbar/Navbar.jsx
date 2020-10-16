import React, { useState } from 'react';
import './Navbar.scss';
import navbarItems from './navbarItem.json';

function Navbar() {

    const [isClicked,setIsClicked] = useState(false);

    return (
        <nav className="navbar">
            <div className="menu-icon" onClick={() => setIsClicked(!isClicked)}>
                <i className={ isClicked ? 'fas fa-times' : 'fas fa-bars' }></i>
            </div>
            <ul className={ isClicked ? 'nav-menu active' : 'nav-menu'}>
                {navbarItems.map((item, index)=> {
                    return <li key={index}><a className={item.cName} href={item.url}>{item.title}</a></li>
                })}
            </ul>
        </nav>
    )
}

export default Navbar;
