import React, { useState, useEffect } from 'react';
import './login.css';

const Login = () => {
    const [käyttäjä, setKäyttäjä] = useState('');
    const [salasana, setSalasana] = useState('');
    const [kirjauduttu, setKirjauduttu] = useState(false);
    const [uusiNimi, setUusiNimi] = useState('');
    const [uusiKNimi, setUusiKNimi] = useState('');
    const [uusiSala, setUusiSala] = useState('');
    const [uusiSahko, setUusiSahko] = useState('');

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

    function Tallenna() {
        const newUser = {
            Name: uusiNimi,
            Username:uusiKNimi,
            Password:uusiSala,
            Email:uusiSahko
        };
        console.log("tähän tulee uusi kirja", newUser)
        fetch("http://localhost:5000/api/User/createusers", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));  
    }
    return (
        <form className="login-container">
            {!kirjauduttu &&
                <div>
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
                    <button onClick={handleKirjaudu}>Kirjaudu</button>
                    <h1>Mikäli sinulla ei ole käyttäjätietoja voit lisätä ne tästä</h1>
                        <div>
                            <label>
                                Anna nimesi:
                                <input type="text" onChange={(e) => setUusiNimi(e.target.value)}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Anna käyttäjänimi:
                                <input type="text" onChange={(e) => setUusiKNimi(e.target.value)}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Anna salasana:
                                <input type="password" onChange={(e) => setUusiSala(e.target.value)}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Anna sähköpostiosoitteesi:
                                <input type="text" onChange={(e) => setUusiSahko(e.target.value)}></input>
                            </label>
                        </div>
                        <button onClick={Tallenna}>Rekisteröi uudet tiedot</button>
                </div>
            }
            {kirjauduttu &&
                <div>
                    <h1>Hei käyttäjä!</h1>
                    <button onClick={handleKirjauduulos}>Kirjaudu ulos</button>
                </div>
            }
        </form>
    );
}

export { Login };