import { Link } from 'react-router-dom'
import logo2 from '../images/nootwarelogovalkoinen.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo2} alt="Company logo" />
            </div>
            <ul className="navbar-links">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Etusivu</Link>
                </li>
                <li className="nav-item">
                    <Link to="/projects" className="nav-link">Projektit</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Ota yhteyttä</Link>
                </li>
            </ul>
        </nav>
    );
};