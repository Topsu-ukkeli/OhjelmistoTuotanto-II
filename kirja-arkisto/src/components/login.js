import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [käyttäjä, setKäyttäjä] = useState('');
    const [salasana, setSalasana] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="login-container">
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
            <p>Pitäiskö tähän tehä joku luo tili vai kovakoodataanko??</p>
        </form>
    );
}

export { Login };