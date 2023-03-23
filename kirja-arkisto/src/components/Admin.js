//TÄNNE ADMIN OIKEUKSILLA TOIMIVAT JUTUT
import React, { useState, useEffect } from 'react';
import "./Admin.css";


const Admin = () => {
    const [kirjat, setKirjat] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchUsers();
    }, [kirjat])
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/kirja/");
            const data = await response.json();
            setKirjat(data);
        }
        catch (err) {
            setError(err);
        }
    }
    const DeleteKirja = async (kirja) => {
        await fetch(
            `http://localhost:5000/api/kirja/deletekirja/${kirja._id}`,
            {
                method: "DELETE",
            }
        );
    };

    const [sarjat, setSarjat] = useState([]);
    useEffect(() => {
        fetchSarjas();
    }, [kirjat])
    const fetchSarjas = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/sarja/");
            const data = await response.json();
            setSarjat(data);
        }
        catch (err) {
            setError(err);
        }
    }
    const DeleteSarja = async (sarja) => {
        await fetch(
            `http://localhost:5000/api/sarja/${sarja._id}`,
            {
                method: "DELETE",
            }
        );
    };


    return (
        <div>
            <div className="sarja-admin">
                <h1>Sarjat:</h1>
                {sarjat.map((sarja) => (
                    <tr>
                        <td>
                            Sarjanimi:
                            {sarja.Sarjanimi}
                        </td>
                        <td>
                            Kustantaja:
                            {sarja.Kustantaja}
                        </td>
                        <td>
                            Kuvaus:
                            {sarja.Kuvaus}
                        </td>
                        <td>
                            Kunto:
                            {sarja.Luokittelu}
                        </td>
                        <td>
                            <button class="button-85" role="button" onClick={() => DeleteSarja(sarja)}>VAIN ADMIN VOI POISTAA!</button>
                        </td>
                    </tr>
                ))}
            </div>
            <br />
            <div className="kirja-admin">
                <h1>Kirjat:</h1>
                {kirjat.map((kirja) => (
                    <tr>
                        <td>
                            Kirjanimi:
                            {kirja.title}
                        </td>
                        <td>
                            Kirjailija:
                            {kirja.author}
                        </td>
                        <td>
                            Julkaisuvuosi:
                            {kirja.published}
                        </td>
                        <td>
                            <button class="button-85" role="button" onClick={() => DeleteKirja(kirja)}>VAIN ADMIN VOI POISTAA!</button>
                        </td>
                    </tr>
                ))}
            </div>
        </div>
    )
}

export { Admin }