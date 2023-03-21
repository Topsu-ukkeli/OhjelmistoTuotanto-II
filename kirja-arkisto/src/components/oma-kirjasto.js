import React, { useState, useEffect } from 'react';
import "./oma-kirjasto.css";
import {Login} from "./login.js";


//https://moog.antikvariaattimakedonia.fi/index.php?sivu=lehdet&moog_sarja_id=342
const OmaKirjasto = () => {
    const [omatkirjat, setOmatkirjat] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		fetchUsers();
	}, [])
	const fetchUsers = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/omakirjasto/");
			const data = await response.json();
			setOmatkirjat(data);
		}
		catch (err) {
			setError(err);
		}
	}
    const [kirjauduttu, setKirjauduttu] = useState(false);

    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [] )

    return (
        <div>
            {kirjauduttu ? (
                <FrontPage omatkirjat={omatkirjat} />
            ):(
				<>
                <h1>Sinun on kirjauduttava sisään jotta voit käyttää omaa kirjastoa</h1>
				</>
            )}
        </div>
    )
}
const OpenMore = props => {
	return (
		<div className="popup-box">
			<div className="box">
				<button className="btn-close" onClick={props.handleClose}>sulje</button>
				{props.content}
			</div>
		</div>
	)
}
const Card = ({ omakirja }) => {
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className="card">
			<img src={omakirja.image} alt={omakirja.image} className='card_img' />
			<div className="card-info">
				<h2>{omakirja.title}</h2>
				<p>Author: {omakirja.author}</p>
				<p>Published: {omakirja.published}</p>
				<p>Pages: {omakirja.pages}</p>
				{isOpen && <OpenMore
					handleClose={togglePopup}
					content={<div>
						<h1>{omakirja.title}</h1>
						<h2>Author: {omakirja.author}</h2>
						<h2>Published: {omakirja.published}</h2>
						<h2>Pages: {omakirja.pages}</h2>
						<img src={omakirja.image} className='popupcard' />
					</div>}
				/>}
				<div>
					<button onClick={togglePopup}>Lisätietoja</button>
				</div>
			</div>
		</div>
	);
}
// const SearchBar = ({ onChange }) => {
// 	return (
// 		<div className="search-bar">
// 			<label htmlFor="search-input">Search by ID:</label>
// 			<input
// 				id="search-input"
// 				type="text"
// 				onChange={(event) => onChange(event.target.value)}
// 			/>
// 		</div>
// 	);
// }

const FrontPage = ({ omatkirjat }) => {
	// const [searchTerm, setSearchTerm] = useState('');

	// const filteredBooks = omatkirjat.filter(kirja => {
	// 	return kirja.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	// })

	return (
		<div >
			{/* <SearchBar onChange={setSearchTerm} /> */}
			<div>
				{omatkirjat.map((omakirja) => (
					<Card key={omakirja.id} omakirja={omakirja} />
				))}
			</div>
		</div>
	);
}
export { OmaKirjasto, FrontPage,OpenMore,Card };