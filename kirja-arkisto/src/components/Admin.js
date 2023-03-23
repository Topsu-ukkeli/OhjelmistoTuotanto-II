//TÄNNE ADMIN OIKEUKSILLA TOIMIVAT JUTUT
import React, { useState, useEffect } from 'react';
import "./Admin.css";


const Admin = () => {
    const [kirjat, setKirjat] = useState([]);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);

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

    const handleToggle = () => {
        setVisible((current) => !current);
    }

    // function Tallenna() {
    //     const newBook = {
    //         title: title,
    //         author: author,
    //         published: published,
    //         page: page,
    //         image: image,
    //         sarjaid: sarjaid
    //     };
    //     console.log("tähän tulee uusi kirja", newBook)
    //     fetch("http://localhost:5000/api/Kirja/Kirjat", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newBook)
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.error(error));
    //         setShowmsg(true);
    // }



    return (
        <div>
            <button class="button-85" role="button" >Lisää kirja tietokantaan</button>
            <br />
            <button class="button-85" role="button" onClick={() => handleToggle()}>Poista kirja tai sarja tietokannasta</button>
            <br />
            <button class="button-85" role="button">Muokkaa kirjaa</button>
            {visible && (
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
                                <button onClick={DeleteSarja}>Poista sarja</button>
                            </td>
                        </tr>
                    ))}
                </div>
            )}
            < br />
            {visible && (
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
                                <button onClick={DeleteKirja}>Poista kirja </button>
                            </td>
                        </tr>
                    ))}
                </div>
            )}
        </div>
    )
}

export { Admin }