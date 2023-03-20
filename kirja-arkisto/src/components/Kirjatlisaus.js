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
    const [serieid, setSerieid] = useState('');
    const [showMsg, setShowmsg] = useState(false);


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
            sivut: page,
            image: image,
            sarjaid: serieid
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
            <div className="inputs">
                <h1>Tänne sit vähän juttuja</h1>
                <label className='labels'>
                    What is the title of the book?:
                    <input type="text" className='kirja-input' value={title} onChange={e => setTitle(e.target.value)}></input>
                </label>
                <br />
                <label className='labels'>
                    Who is the author:
                    <input type="text" className='kirja-input' value={author} onChange={e => setAuthor(e.target.value)}></input>
                </label>
                <br />
                <label className='labels'>
                    When was the book published:
                    <input type="text" className='kirja-input' value={published} onChange={e => setPublished(e.target.value)}></input>
                </label>
                <br />
                <label className='labels'>
                    how many pages are there?:
                    <input type="text" className='kirja-input' value={page} onChange={e => setPages(e.target.value)}></input>
                </label>
                <br />
                <label className='labels'>
                    Select perfect image:
                    <input type="text" className='kirja-input' value={image} onChange={e => setImage(e.target.value)}></input>
                </label>
                <br />
                <label className='labels'>
                    SeriesID:
                    <input type="text" className='kirja-input' value={serieid} onChange={e => setSerieid(e.target.value)}></input>
                </label>
                <button onClick={Tallenna} type="submit">Tallenna uusi kirjasi</button>
            </div>
    )
}
export { Kirjatlisaus };