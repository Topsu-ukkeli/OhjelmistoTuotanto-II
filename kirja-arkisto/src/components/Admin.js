//TÄNNE ADMIN OIKEUKSILLA TOIMIVAT JUTUT
import React, { useState, useEffect } from 'react';
import "./Admin.css";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const Admin = () => {
    const [kirjat, setKirjat] = useState([]);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [kirjaMuokkausVisible, setKirjaMuokkausVisible] = useState(false);
    const [sarjaMuokkausVisible, setSarjaMuokkausVisible] = useState(false);
    const [kirjaMuokkaus, setKirjaMuokkaus] = useState([]);
    const [sarjatMuokkausT, setSarjatMuokkausT] = useState([]);
    const [newSarjaid, setNewSarjaid] = useState("0");
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newPublis, setNewPublis] = useState("");
    const [newPage, setNewPage] = useState("");
    const [newLuokittelu, setNewLuokittelu] = useState("");
    const [kirjaids, setKirjaids] = useState("");
    const [sarjaids, setSarjaids] = useState("");
    const [newSarjanimi, setNewSarjanimi] = useState("");
    const [newKustantaja, setNewKustantaja] = useState("");
    const [newKuvaus, setNewKuvaus] = useState("");
    const numbers = [
        { id: 1, number: 1 },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 }
    ]
    useEffect(() => {
        fetchUsers();
    }, [])//<---- tuohon jos laittaa kirja network pyörii 24/7
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
    }, []) //<---- tuohon jos laittaa kirja network pyörii 24/7
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
        setNewTitle(kirja.title);
        setNewAuthor(kirja.author);
        setNewPublis(kirja.published);
        setNewPage(kirja.page);
        setNewSarjaid(kirja.sarjaid);
        setKirjaids(kirja._id);
    }
    const handleSarjaMuokkaus = ({ sarja }) => {
        setSarjaMuokkausVisible(true);
        setVisible((current) => !current);
        setSarjatMuokkausT(sarja)
        setNewSarjanimi(sarja.Sarjanimi);
        setNewKustantaja(sarja.Kustantaja);
        setNewKuvaus(sarja.Kuvaus);
        setNewLuokittelu(sarja.Luokittelu);
        setSarjaids(sarja._id);
    }

    const parsePicturePath = (picture) => {
		const Slash = picture.lastIndexOf("\\");
		if (Slash === -1) {
			return picture;
		}
		return picture.substring(Slash + 1).replace(/\\/g, "/");
	};

    const PaivitaSarja = async () => {
        const updatedBook = {
            Sarjanimi: newSarjanimi,
            Kustantaja: newKustantaja,
            Kuvaus: newKuvaus,
            Luokittelu: newLuokittelu,
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/sarja/${sarjaids}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBook)
            });
            const data = await response.json();
            if (data.ok) {
                toast.success('Sarjan lisäys onnistui!');
            } else {
                toast.error('Sarjan lisäys epäonnistui!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Tiedoston lataaminen epäonnistui!');
        }
    }
    const PaivitaKirja = async () => {
        const updatedBook = {
            title: newTitle,
            author: newAuthor,
            published: newPublis,
            page: newPage,
            sarjaid: newSarjaid
        }
        try {
            const response = await fetch(`http://localhost:5000/api/kirja/${kirjaids}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBook)
            });
            const data2 = await response.json();
            if (data2.ok) {
                toast.success('Sarjan lisäys onnistui!');
            } else {
                toast.error('Sarjan lisäys epäonnistui!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Tiedoston lataaminen epäonnistui!');
        }
    };
    return (
        <div>
            <Link to="/Kirjalisaus">
                <button class="button">Lisää kirja tietokantaan</button>
            </Link>
            <br />
            <br />
            <Link to="/Sarjalisaus">
                <button class="button">Lisää uusi sarja tietokantaan</button>
            </Link>
            <br />
            <br />
            <button class="button" onClick={() => handleToggle()}>Poista kirja tai sarja tai muokkaa tietoja</button>
            <br />
            <br />
            {/* <Link to="/Kirjamuokkaus">
            </Link> */}
            {/* mahdollisesti poistetaan tuo Link ja laitetaan vaan tälle sivulle se muokkaus tuolla visible tyylillä */}

            {visible && (
                <div className="sarja-admin">
                    <article>
                        <h1>Sarjat:</h1>
                        {sarjat.map((sarja) => (
                            <dl>
                                <img src={parsePicturePath(sarja.image)} alt="img" className="card_img" />
                                <dd>
                                    Sarjanimi:
                                    <br />
                                    {sarja.Sarjanimi}
                                </dd>
                                <dd>
                                    Kustantaja:
                                    <br />
                                    {sarja.Kustantaja}
                                </dd>
                                <dd>
                                    Kunto:
                                    <br />
                                    {sarja.Luokittelu}
                                </dd>
                                <dd>
                                    <button class="button" onClick={() => DeleteSarja(sarja)}>Poista sarja</button>
                                    <button class="button" onClick={() => handleSarjaMuokkaus({ sarja })}>Muokkaa sarja</button>
                                </dd>
                            </dl>
                        ))}
                    </article>
                </div>
            )}
            < br />
            {visible && (
                <article>
                    <div className="kirja-admin">
                        <h1>Kirjat:</h1>
                        {kirjat.map((kirja) => (
                            <dl>
                                <img src={parsePicturePath(kirja.image)} alt="img" className="card_img" />
                                <dd>
                                    Kirjanimi:
                                    <br />
                                    {kirja.title}
                                </dd>
                                <dd>
                                    Kirjailija:
                                    <br />
                                    {kirja.author}
                                </dd>
                                <dd>
                                    Julkaisuvuosi:
                                    <br />
                                    {kirja.published}
                                </dd>
                                <dd>
                                    <button class="button" onClick={() => DeleteKirja(kirja)}>Poista kirja </button>
                                    <button class="button" onClick={() => handleKirjaMuokkaus({ kirja })}>Muokkaa kirja</button>
                                </dd>
                            </dl>
                        ))}
                    </div>
                </article>
            )}
            {kirjaMuokkausVisible && (
                <div className="kirja-admin">
                    <label>
                        Kirjan nimi:
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></input>
                    </label>
                    <label>
                        Kirjoittaja:
                        <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)}></input>
                    </label>
                    <label>
                        Julkaisuvuosi:
                        <input type="text" value={newPublis} onChange={(e) => setNewPublis(e.target.value)}></input>
                    </label>
                    <label>
                        Sivumäärä:
                        <input type="text" value={newPage} onChange={(e) => setNewPage(e.target.value)}></input>
                    </label>
                    <label className='labels'>
                        SeriesID:
                        <select className='kirja-input' onChange={(e) => setNewSarjaid(e.target.value)}>
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
                        <input type="text" value={newSarjanimi} onChange={(e) => setNewSarjanimi(e.target.value)}></input>
                    </label>
                    <label>
                        Kustantaja:
                        <input type="text" value={newKustantaja} onChange={(e) => setNewKustantaja(e.target.value)}></input>
                    </label>
                    <label>
                        Kuvaus:
                        <input type="text" value={newKuvaus} onChange={(e) => setNewKuvaus(e.target.value)}></input>
                    </label>
                    <label className='labels'>
                        Luokittelu:
                        <select onChange={(e) => setNewLuokittelu(e.target.value)}>
                            {numbers.map((row) => (
                                <option key={row.id} value={row.id}>{row.number}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={PaivitaSarja}>Päivitä tiedot</button>
                </div>
            )}
        </div>
    )
}

export { Admin }