import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const SarjatLisaus = () => {
    useEffect(() => {

    }, []);
    const [Sarjanimi, setSarjanimi] = useState('');
    const [Kustantaja, setKustantaja] = useState('');
    const [Kuvaus, setKuvaus] = useState('');
    const [Luokittelu, setLuokittelu] = useState("");
    const [sarjaid, setSerieid] = useState('');
    const [img, setimg] = useState('');
    const [kirjauduttu, setKirjauduttu] = useState(false);

    const numbers = [
        {id:1,number:1},
        {id:2,number:2},
        {id:3,number:3},
        {id:4,number:4},
        {id:5,number:5}
    ]
    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [])


    function handleImageChange(e) {
        setimg(e.target.files[0]);
    }

    async function Tallenna() {
        const formData = new FormData();
        formData.append('Sarjanimi', Sarjanimi);
        formData.append('Kustantaja', Kustantaja);
        formData.append('Kuvaus', Kuvaus);
        formData.append('Luokittelu', Luokittelu);
        formData.append('image', img);
        formData.append('sarjaid', sarjaid);
        try {
            const response = await fetch("http://localhost:5000/api/Sarja/createSarja", {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (response.ok) {
                toast.success('Sarja lisätty onnistuneesti!');
            } else {
                toast.error('Sarjan lisäys epäonnistui!');
            }
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
            <h1>Sarjan lisäys</h1>
            {kirjauduttu ? (
                <div className="inputs-container">
                    <label className='labels'>
                        Sarjan nimi:
                        <input type="text" className='kirja-input' value={Sarjanimi} onChange={e => setSarjanimi(e.target.value)}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        Kustantaja:
                        <input type="text" className='kirja-input' value={Kustantaja} onChange={e => setKustantaja(e.target.value)}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        Kuvaus:
                        <input type="text" className='kirja-input' value={Kuvaus} onChange={e => setKuvaus(e.target.value)}></input>
                    </label>
                    <br />
                    <label className='labels'>
                        Luokittelu:
                        <select onChange={(e) => setLuokittelu(e.target.value)}>
                            {numbers.map((row) => (
                            <option key={row.id} value = {row.number}>{row.number}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <br/>
                    <label>
                        Luo sarjaid:
                        <input type='number' onChange={(e) => setSerieid(e.target.value)}></input>
                    </label>
                    <br/>
                    <label className='labels'>
                        Sarjan kansikuva:
                        <input type="file" className='kirja-input' onChange={handleImageChange}></input>
                    </label>
                    <br />
                    <button onClick={Tallenna} type="submit">Tallenna uusi sarja</button>
                </div>

            ) : (
                <div>
                    <h3>Kirjaudu sisään lisätäksesi sarjan</h3>
                    <Link to="/login">
                        <button>Kirjautumissivulle</button>
                    </Link>
                </div>
            )}
        </div>
    )
}
export { SarjatLisaus };