import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';
import logo from '../images/logo.png'
import { Login } from './login'

export const Navbar = () => {

    const [kirjauduttu, setKirjauduttu] = useState();


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
                    <li>
                        {!kirjauduttu &&
                        <Link to="/login" className="nav-link">Kirjaudu sisään</Link>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    );
};