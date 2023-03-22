import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';
import logo from '../images/logo.png'

export const Navbar = ({ login }) => {
    const [kirjauduttu, setKirjauduttu] = useState(false);
    const [Kid, setKid] = useState(false);

    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        if (kirjautumisdata !== null)
            setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [])

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('KIRJAUDUTTU_DATA', JSON.stringify(kirjauduttu));
        }, 300);
    }, [kirjauduttu]);
    useEffect(()=>{
        const id = JSON.parse(localStorage.getItem("user"));
        if(id){
            if(id === "641af8330931caa8ce2343ff"){
                setKid(true);
            }
        }
    }, [setKid])
    const handleKirjauduulos = () => {
        console.log("kävin poistossa");
        try {
            localStorage.removeItem("user");
        } catch (err) {
            console.log("ei heitä");
        }

        setKirjauduttu(false);
        // setKirjauduttuData(false);
    }
    return (
        <nav className="navbar">
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
                    <Link to="/Kirjat" className="nav-link">Kirjat</Link>
                </li>
                {Kid && (
                    <li className='nav-item'>
                        <Link to="/admin" className="nav-link">ADMIN</Link>
                    </li>
                )}
                <li>
                    {!kirjauduttu &&
                        <Link to="/login" className="nav-link">Kirjaudu sisään</Link>
                    }
                    {kirjauduttu &&
                        <Link to="/" className="nav-link" onClick={handleKirjauduulos}>Kirjaudu ulos</Link>
                    }
                    {/* kirjaudu ulos päivittyy vain refreshaamalla sivun, mitenhän tämän saisi korjattua */}
                </li>
            </ul>
        </nav>
    );
};