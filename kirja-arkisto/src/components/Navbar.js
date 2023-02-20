import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';
import logo from '../images/logo.png'

export const Navbar = () => {
    return (
        <div>
            <nav className="container-fluid">
                <ul className="navbar-links">
                    <li className="nav-item">
                        <Link to="/" ><img src={logo} alt="Kirjasto logo" className="navbar-img" /></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Etusivu</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Sarjat" className="nav-link">Sarjat</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/oma-kirjasto" className="nav-link">Oma kirjasto</Link>
                    </li>
                </ul>
                <ul className="navbar-links">
                    <li className="nav-item">
                        <Link to="/login" className="nav-login">Kirjaudu sisään</Link>
                        <p>tähän joku boolean että teksti muuttuu "kirjaudu ulos"
                            mikäli on kirjauduttu sisään jos jaksaa lmao</p>
                    </li>
                </ul>
            </nav>
        </div>
    );
};