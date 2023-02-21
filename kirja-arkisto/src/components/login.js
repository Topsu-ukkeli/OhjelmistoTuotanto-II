import React, { useState, useEffect } from 'react';
import './login.css';

const Login = () => {
    const [käyttäjä, setKäyttäjä] = useState('');
    const [salasana, setSalasana] = useState('');
    const [kirjauduttu, setKirjauduttu] = useState(false);

    //https://github.com/colbyfayock/my-welcome-banner/blob/main/pages/index.js
    //https://www.youtube.com/watch?v=rWfhwW9forg

    // tässä koitetaan tallentaa tietoa localstorageen kirjautumisesta mutta eihän se vittu toimi
    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [] )

    useEffect(() => {
        setTimeout(() => {
        localStorage.setItem('KIRJAUDUTTU_DATA', JSON.stringify(kirjauduttu));
        }, 300);
    }, [kirjauduttu]);


    const handleKirjaudu = () => {
        setKirjauduttu(true);
    }
    const handleKirjauduulos = () => {
        setKirjauduttu(false);
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
                    <p>// Pitäiskö tähän tehä joku luo tili vai kovakoodataanko??</p>
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