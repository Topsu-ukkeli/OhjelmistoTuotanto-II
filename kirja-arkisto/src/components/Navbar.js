import { Link } from 'react-router-dom'
import './Navbar.css';
import logo from '../images/logo.png'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <img src={logo} alt="Kirjasto logo" />
            </div>
            <ul className="navbar-links">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Etusivu</Link>
                </li>
                <li className="nav-item">
                    <Link to="/oma-kirjasto" className="nav-link">Oma kirjasto</Link>
                </li>
            </ul>
        </nav>
    );
};