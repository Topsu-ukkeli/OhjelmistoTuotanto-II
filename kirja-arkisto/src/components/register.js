import React, { useState, useEffect } from 'react';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [uusiNimi, setUusiNimi] = useState('');
    const [uusiKNimi, setUusiKNimi] = useState('');
    const [uusiSala, setUusiSala] = useState('');
    const [uusiSahko, setUusiSahko] = useState('');
    const [onnistui, setOnnistui] = useState(null);


    function Tallenna(e) {
        e.preventDefault();
        const newUser = {
            Name: uusiNimi,
            Username: uusiKNimi,
            Password: uusiSala,
            Email: uusiSahko
        };
        fetch("http://localhost:5000/api/User/createusers", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                if (!response.ok) {
                    setOnnistui(false);
                    throw new Error('Failed to create user');
                }
                if (response.ok) {
                    toast.success('Rekisteröinti onnistui, sinut siirretään kirjautumissivulle');
                    setOnnistui(true);
                }
                return response.json();
            })
            .then(data => {
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="register-container">
            <form>
                <h1>Luo uusi tili</h1>
                <p>Syötä tietosi alla oleviin kenttiin</p>
                <div>
                    <div>
                        <label>
                            Nimi
                            <input type="text" onChange={(e) => setUusiNimi(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Käyttäjänimi
                            <input type="text" onChange={(e) => setUusiKNimi(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <div>
                            <label>
                                Salasana
                                <input type="password" onChange={(e) => setUusiSala(e.target.value)}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Sähköpostiosoite
                                <input type="text" onChange={(e) => setUusiSahko(e.target.value)}></input>
                            </label>
                        </div>
                        <button onClick={(e) => Tallenna(e)}>Rekisteröi uudet tiedot</button>
                        {onnistui == false &&
                            <h3 style={{ color: "red" }}>Rekisteröinti ei onnistunut, yritä uudelleen</h3>
                        }
                        <ToastContainer
                            position="bottom-center"
                            hideProgressBar={false}
                            closeOnClick
                            pauseOnHover
                            theme="light"
                            autoClose={5000} />
                        {onnistui &&
                            <>
                                {setTimeout(() => {
                                    window.location.href = '/login';
                                }, 5000)}
                            </>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}
export { Register };