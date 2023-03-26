import React, { useState, useEffect } from 'react';
import "./Kirjatlisaus.css";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Kirjatlisaus = () => {
    useEffect(() => {

    }, []);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [page, setPages] = useState('');
    const [image, setImage] = useState('');
    const [sarjaid, setSerieid] = useState('');
    const [showMsg, setShowmsg] = useState(false);
    const [sarjas, setSarjas] = useState([]);
    const [kirjauduttu, setKirjauduttu] = useState(false);

    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [])

    useEffect(() => {
        const getSarjat = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/sarja/");
                const data = await response.json();
                setSarjas(data);
            }
            catch (err) {
            }
        }
        getSarjat();
    }, [])

    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    async function Tallenna() {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('published', published);
        formData.append('page', page);
        formData.append('image', image);
        formData.append('sarjaid', sarjaid);

        try {
            const response = await fetch("http://localhost:5000/api/Kirja/Kirjat", {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                toast.success('Kirja lisätty onnistuneesti!');
            } else {
                toast.error('Kirjan lisäys epäonnistui!');
            }
            setShowmsg(true);
        } catch (err) {
            console.error(err);
            toast.error('Error uploading file!');
        }
    }

    return (
        <div className='kirjatlisaus-container'>
            <ToastContainer
                position="bottom-center"
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="light"
                autoClose={10000} />
            <h1>Kirjan lisäys</h1>
            {kirjauduttu ? (
                <div className="inputs-container">
                    <label className='labels'>
                        Kirjan nimi:
                        <input type="text" className='kirja-input' value={title} onChange={e => setTitle(e.target.value)}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        Kirjoittaja:
                        <input type="text" className='kirja-input' value={author} onChange={e => setAuthor(e.target.value)}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        Julkaisuaika:
                        <input type="text" className='kirja-input' value={published} onChange={e => setPublished(e.target.value)}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        Sivumäärä:
                        <input type="text" className='kirja-input' value={page} onChange={e => setPages(e.target.value)}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        Kansikuva:
                        <input type="file" className='kirja-input' onChange={handleImageChange}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        {/* Vaihdetaan tähän select option jotta voi valita sarjan ja saadaan se id oikein  */}
                        SeriesID:
                        <select className='kirja-input' onChange={(e) => setSerieid(e.target.value)}>
                            {sarjas.map((sarja, index) => (
                                <option key={`${sarja.sarjaid}_${index}`} value={sarja.sarjaid}>{sarja.Sarjanimi}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={Tallenna} type="submit">Tallenna uusi kirja</button>
                </div>

            ) : (
                <div>
                    <h3>Kirjaudu sisään lisätäksesi kirja</h3>
                    <Link to="/login">
                        <button>Kirjautumissivulle</button>
                    </Link>
                </div>
            )}
        </div>
    )
}
export { Kirjatlisaus };