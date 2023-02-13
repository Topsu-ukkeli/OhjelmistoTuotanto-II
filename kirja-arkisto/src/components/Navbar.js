import { Link } from 'react-router-dom'
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">

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