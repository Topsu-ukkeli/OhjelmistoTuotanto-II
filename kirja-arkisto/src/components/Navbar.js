import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';
import logo from '../images/logo.png'

export const Navbar = ({login}) => {
    const [kirjauduttu, setKirjauduttu] = useState(false);

    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        if(kirjautumisdata !== null)
        setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [])

    useEffect(() => {
        setTimeout(() => {
        localStorage.setItem('KIRJAUDUTTU_DATA', JSON.stringify(kirjauduttu));
        }, 300);
    }, [kirjauduttu]);


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
                    <li className="nav-item">
                        <Link to="/Kirjat" className="nav-link">Kirjoihin</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/KirjaLisaus" className="nav-link">Lisää uusi kirja</Link>
                    </li>
                    <li>
                        {!kirjauduttu &&
                            <Link to="/login" className="nav-link">Kirjaudu sisään</Link>
                        }
                        {kirjauduttu &&
                            <Link to="/" className="nav-link" onClick={() => setKirjauduttu(false)}>Kirjaudu ulos</Link>
                        }
                        {/* kirjaudu ulos päivittyy vain refreshaamalla sivun, mitenhän tämän saisi korjattua */}
                    </li>
                </ul>
            </nav>
        </div>
    );
};