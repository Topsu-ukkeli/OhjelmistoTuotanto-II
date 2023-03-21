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


    function Tallenna() {
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
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <form className="register-container">
            <h1>Luo uusi tili</h1>
            <div>
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
    )
}
export { Register };