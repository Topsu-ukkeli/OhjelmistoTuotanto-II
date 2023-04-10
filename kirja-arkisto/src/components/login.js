import React, { useState, useEffect } from 'react';
import './login.css';
import { Link } from 'react-router-dom'
const Login = ({ setUserID, setAdminlogged, setKirjauduttu, kirjauduttu }) => {
    const [käyttäjä, setKäyttäjä] = useState('');
    const [salasana, setSalasana] = useState('');
    const [users, setUser] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [])
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
        //setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [])

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('KIRJAUDUTTU_DATA', JSON.stringify(kirjauduttu));
        }, 300);
    }, [kirjauduttu]);


    const handleKirjaudu = () => {
        let KID;
        users.map((user) => {
            if (käyttäjä === user.Username && user.Password === salasana) {
                setKirjauduttu(true);
                KID = user._id;
                localStorage.setItem("user", JSON.stringify(KID));
                setKirjauduttu(true);
                if (KID === "641af8330931caa8ce2343ff") {
                    setAdminlogged(true);
                } else {
                    setAdminlogged(false);
                }
            }
        })
        // setKirjauduttuData(true);
        setUserID(KID);
    }
    const handleKirjauduulos = () => {
        try {
            localStorage.removeItem("user");
        } catch (err) {
        }

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
                        <input type="käyttäjätunnus" autoFocus
                            value={käyttäjä} onChange={(event) => setKäyttäjä(event.target.value)} />
                    </div>
                    <div>
                        <label>Salasana:</label>
                        <input type="password" id="password"
                            value={salasana} onChange={(event) => setSalasana(event.target.value)} />
                    </div>
                        <button id='login' onClick={handleKirjaudu}>Kirjaudu sisään</button>
                    <p className="">Mikäli sinulla ei ole vielä tunnuksia pääset rekisteröitymään <a><Link to="/register">tästä.</Link></a></p>
                        
                </div>
            }
            {kirjauduttu &&
                <div>
                    <h1>Hei {käyttäjä}!</h1>
                    <div className="napit">
                    <Link to="/oma-kirjasto">
                        <button id='kirjastoon'>Omaan kirjastoon</button>
                    </Link>
                    <button onClick={handleKirjauduulos}>Kirjaudu ulos</button>
                    </div>
                </div>
            }
        </form >
    );
}

export { Login };