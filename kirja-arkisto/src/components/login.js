import React, { useState, useEffect } from 'react';
import './login.css';
import { Link } from 'react-router-dom'

const Login = () => {
    const [käyttäjä, setKäyttäjä] = useState('');
    const [salasana, setSalasana] = useState('');
    const [kirjauduttu, setKirjauduttu] = useState(false);
    const [users, setUser] = useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        fetchUsers();
    }, [users])
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/User/");
            const data = await response.json();
            setUser(data);
        }
        catch (err) {
            setError(err);
        }
    }
    //https://github.com/colbyfayock/my-welcome-banner/blob/main/pages/index.js
    //https://www.youtube.com/watch?v=rWfhwW9forg

    // tässä koitetaan tallentaa tietoa localstorageen kirjautumisesta mutta eihän se vittu toimi
    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [])

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('KIRJAUDUTTU_DATA', JSON.stringify(kirjauduttu));
        }, 300);
    }, [kirjauduttu]);


    const handleKirjaudu = () => {
        users.map((user) => {
            if (käyttäjä === user.Username && user.Password === salasana) {
                setKirjauduttu(true);
            }
        })
        // setKirjauduttuData(true);
    }
    const handleKirjauduulos = () => {
        setKirjauduttu(false);
        // setKirjauduttuData(false);
    }


    return (
        <form className="login-container">
            {!kirjauduttu &&
                <div>
                    <h1>Kirjaudu sisään</h1>
                    <div>
                        <label>Käyttäjä:</label>
                        <input type="käyttäjätunnus"
                            value={käyttäjä} onChange={(event) => setKäyttäjä(event.target.value)} />
                    </div>
                    <div>
                        <label>Salasana:</label>
                        <input type="password" id="password"
                            value={salasana} onChange={(event) => setSalasana(event.target.value)} />
                    </div>
                    <div>
                    <button onClick={handleKirjaudu}>Kirjaudu</button>
                    <Link to="/register">
                    <button>Rekisteröidy</button>
                    </Link>
                    </div>
                </div>
            }
            {kirjauduttu &&
                <div>
                    <h1>Hei {käyttäjä}!</h1>
                    <Link to="/oma-kirjasto">
                    <button>Omaan kirjastoon</button>
                    </Link>
                    <button onClick={handleKirjauduulos}>Kirjaudu ulos</button>
                </div>
            }
        </form >
    );
}

export { Login };