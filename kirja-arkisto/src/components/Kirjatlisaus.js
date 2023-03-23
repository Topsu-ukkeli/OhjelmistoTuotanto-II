import React, { useState, useEffect } from 'react';
import "./Kirjatlisaus.css";
import { Link } from 'react-router-dom'


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
    })
    // const Tallenna = () => {
    //     const newBook = {
    //         title:title,
    //         author:author,
    //         published:published,
    //         pages:page,
    //         image:image,
    //         sarjaid:serieid
    //       };
    //       console.log("uusi kirjasi on",newBook);
    //       fetch("http://localhost:5000/api/kirja/", {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newBook)
    //       },[title, author, published, page, image, serieid])
    // }
    function Tallenna() {
        const newBook = {
            title: title,
            author: author,
            published: published,
            page: page,
            image: image,
            sarjaid: sarjaid
        };
        console.log("tähän tulee uusi kirja", newBook)
        fetch("http://localhost:5000/api/Kirja/Kirjat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            setShowmsg(true);
    }
    return (
        <div className='kirjatlisaus-container'>
            <h1>Kirjan lisäys</h1>
            {kirjauduttu ?(
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
                    <input type="file" className='kirja-input' value={image} onChange={e => setImage(e.target.value)}></input>
                </label>
                <br />
                <label className='labels'>
                    {/* Vaihdetaan tähän select option jotta voi valita sarjan ja saadaan se id oikein  */}
                    SeriesID:
                    <select className='kirja-input' onChange={(e) => setSerieid(e.target.value)}>
                        {sarjas.map((sarja) => (
                            <option key={sarja.sarjaid} value={sarja.sarjaid}>{sarja.Sarjanimi}</option>
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