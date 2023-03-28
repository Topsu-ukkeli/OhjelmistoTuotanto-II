//TÄNNE ADMIN OIKEUKSILLA TOIMIVAT JUTUT
import React, { useState, useEffect } from 'react';
import "./Admin.css";
import { Link } from 'react-router-dom'


const Admin = () => {
    const [kirjat, setKirjat] = useState([]);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [kirjaMuokkausVisible, setKirjaMuokkausVisible] = useState(false);
    const [sarjaMuokkausVisible, setSarjaMuokkausVisible] = useState(false);
    const [kirjaMuokkaus, setKirjaMuokkaus] = useState([]);
    const [sarjatMuokkausT, setSarjatMuokkausT] = useState([]);
    const [sarjatMuokkaus, setSarjatMuokkaus] = useState("0");
    const [Luokittelu, setLuokittelu] = useState("");
    const numbers = [
        {id:1,number:1},
        {id:2,number:2},
        {id:3,number:3},
        {id:4,number:4},
        {id:5,number:5}
    ]
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
    const DeleteKirja = async (kirja) => { // tässä tarkistus varmistaakseen että käyttäjä haluaa poistaa kirjan
        if (window.confirm("Haluatko varmasti poistaa kirjan?")) {
            await fetch(
                `http://localhost:5000/api/kirja/deletekirja/${kirja._id}`,
                {
                    method: "DELETE",
                }
            );
        }
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
    const DeleteSarja = async (sarja) => { // tässä tarkistus varmistaakseen että käyttäjä haluaa poistaa sarjan
        if (window.confirm("Haluatko varmasti poistaa sarjan?")) {
            await fetch(
                `http://localhost:5000/api/sarja/${sarja._id}`,
                {
                    method: "DELETE",
                }
            );
        }
    };

    const handleToggle = () => {
        setKirjaMuokkausVisible(false);
        setSarjaMuokkausVisible(false);
        setVisible((current) => !current);
    }
    const handleKirjaMuokkaus = ({ kirja }) => {
        setKirjaMuokkausVisible(true);
        setVisible((current) => !current);
        setKirjaMuokkaus(kirja);
    }
    const handleSarjaMuokkaus = ({ sarja }) => {
        setSarjaMuokkausVisible(true);
        setVisible((current) => !current);
        setSarjatMuokkausT(sarja)
    }
    const PaivitaSarja = () => {
        
    }
    const PaivitaKirja = () => {

    }
    return (
        <div>
            <Link to="/Kirjalisaus">
                <button class="button-85" role="button" >Lisää kirja tietokantaan</button>
            </Link>
            <br />
            <br />
            <Link to="/Sarjalisaus">
                <button class="button-85" role="button" >Lisää uusi sarja tietokantaan</button>
            </Link>
            <br />
            <br />
            <button class="button-85" role="button" onClick={() => handleToggle()}>Poista kirja tai sarja tai muokkaa tietoja</button>
            <br />
            <br />
            {/* <Link to="/Kirjamuokkaus">
            </Link> */}
            {/* mahdollisesti poistetaan tuo Link ja laitetaan vaan tälle sivulle se muokkaus tuolla visible tyylillä */}

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
                                <button class="button-85" onClick={() => DeleteSarja(sarja)}>Poista sarja</button>
                                <button class="button-85" onClick={() => handleSarjaMuokkaus({ sarja })}>Muokkaa sarjaa</button>
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
                                <button class="button-85" onClick={() => DeleteKirja(kirja)}>Poista kirja </button>
                                <button class="button-85" onClick={() => handleKirjaMuokkaus({ kirja })}>Muokkaa kirjaa</button>
                            </td>
                        </tr>
                    ))}
                </div>
            )}
            {kirjaMuokkausVisible && (
                <div className="kirja-admin">
                    <label>
                        Kirjan nimi:
                        <input type="text" value={kirjaMuokkaus.title}></input>
                    </label>
                    <label>
                        Kirjoittaja:
                        <input type="text" value={kirjaMuokkaus.author}></input>
                    </label>
                    <label>
                        Julkaisuvuosi:
                        <input type="text" value={kirjaMuokkaus.published}></input>
                    </label>
                    <label>
                        Sivumäärä:
                        <input type="text" value={kirjaMuokkaus.page}></input>
                    </label>
                    <label className='labels'>
                        SeriesID:
                        <select className='kirja-input' onChange={(e) => setSarjatMuokkaus(e.target.value)}>
                            {sarjat.map((sarja, index) => (
                                <option key={`${sarja.sarjaid}_${index}`} value={sarja.sarjaid}>{sarja.Sarjanimi}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={PaivitaKirja}>Päivitä tiedot</button>
                </div>
            )}
            {sarjaMuokkausVisible && (
                <div className="kirja-admin">
                    <label>
                        Sarjanimi:
                        <input type="text" value={sarjatMuokkausT.Sarjanimi}></input>
                    </label>
                    <label>
                        Kustantaja:
                        <input type="text" value={sarjatMuokkausT.Kustantaja}></input>
                    </label>
                    <label>
                        Kuvaus:
                        <input type="text" value={sarjatMuokkausT.Kuvaus}></input>
                    </label>
                    <label className='labels'>
                        Luokittelu:
                        <select onChange={(e) => setLuokittelu(e.target.value)}>
                            {numbers.map((row) => (
                            <option key={row.id} value = {row.number}>{row.number}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={PaivitaSarja}>Päivitä tiedot</button>
                </div>
            )}
        </div>
    )
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

export { Admin }