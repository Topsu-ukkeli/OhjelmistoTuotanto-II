import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [käyttäjä, setKäyttäjä] = useState('');
    const [salasana, setSalasana] = useState('');
    //miten tätä dataa saa siirrettyä komponentista toiseen?
    const [kirjauduttu, setKirjauduttu] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setKirjauduttu(true);
    };

    const handleKirjauduulos = () => {
        setKirjauduttu(false);
    }

    return (
        <form onSubmit={handleSubmit} className="login-container">
            {!kirjauduttu &&
                <div>
                    <div>
                        <label>Käyttäjä:</label>
                        <input type="käyttäjätunnus"
                            value={käyttäjä} onChange={(event) => setKäyttäjä(event.target.value)} />
                    </div>
                    <div>
                        <label >Salasana:</label>
                        <input type="password" id="password"
                            value={salasana} onChange={(event) => setSalasana(event.target.value)} />
                    </div>
                    <button type="submit">Kirjaudu</button>
                    <p>// Pitäiskö tähän tehä joku luo tili vai kovakoodataanko??</p>
                </div>
            }
            {kirjauduttu &&
                <div>
                    <h1>Hei käyttäjä!</h1>
                    <p>Navbarin kirjaudu sisään pamahtaa simsalabim kirjaudu-ulos</p>
                    <button onClick={handleKirjauduulos}>Kirjaudu ulos</button>
                </div>
            }
        </form>
    );
}

export { Login };