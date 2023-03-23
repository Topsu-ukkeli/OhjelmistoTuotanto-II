import React, { useState, useEffect } from "react";
import Asterix from '../images/asterix.jpg'
import "./sarjat.css";
const mongoose = require('mongoose');


const Sarjat = () => {
	const [sarjat, setSarjat] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		fetchUsers();
	}, [])
	const fetchUsers = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/sarja/");
			const data = await response.json();
			setSarjat(data);
		}
		catch (err) {
			setError(err);
		}
	}
	const [kirjauduttu, setKirjauduttu] = useState(false);

	useEffect(() => {
		const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
		setKirjauduttu(JSON.parse(kirjautumisdata));
	}, [])

	return (
		<div className="sarjat-container">
			<FrontPage sarjat={sarjat} />
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
const Card = ({ sarja }) => {

	const [isOpen, setIsOpen] = useState(false);
	

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className="card-container">
			<div className="card" onClick={togglePopup}>
				<img src={sarja.image} alt={sarja.image} className="card_img" />
				<div className="card-info">
					<h1>{sarja.Sarjanimi}</h1>
					<p>Kuvaus: {sarja.Kuvaus}</p>
					<p>Luokittelu: {sarja.Luokittelu}</p>
					{/* Tähän tulee toinen nappi jolla voit lisätä tämän kyseisen kirjan itsellesi jahka saadaan se mongo toimimaan -Topi */}
					{/* Kyseinen nappi siis lisää tietokantaan tiedon kirjasta jonka halusi lisätä tämä on yksinkertainen Schema ratkasu */}
					{isOpen && <OpenMore
						handleClose={togglePopup}
						content={<div>
							<h1>{sarja.Sarjanimi}</h1>
							<h2>Kuvaus: {sarja.Kuvaus}</h2>
							<h2>Luokittelu: {sarja.Luokittelu}</h2>
							<img src={sarja.image} alt={sarja.image} className='popupcard' />
						</div>}
					/>}
				</div>
			</div>
		</div>
	);
}

const SearchBar = ({ onChange }) => {
	return (
		<div className="search-bar">
			<label htmlFor="search-input">Hae:</label>
			<input
				id="search-input"
				type="text"
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}

const FrontPage = ({ sarjat }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const Filterserie = sarjat.filter(sarja => {
		return sarja.Sarjanimi.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	})

	return (
		<div>
			<h1>Sarjat</h1>
			<SearchBar onChange={setSearchTerm} />
			<div>
				{Filterserie.map((sarja) => (
					<Card key={sarja.id} sarja={sarja} />
				))}
			</div>
		</div>
	);
}
export { SearchBar, FrontPage, Card, Sarjat, OpenMore };