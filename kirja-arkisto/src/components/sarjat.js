import React, { useState, useEffect } from "react";
import "./sarjat.css";
const mongoose = require('mongoose');


const Sarjat = () => {
	const [sarjat, setSarjat] = useState([]);
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
const Card = ({ sarja }) => {
	const [kirjat, setKirjat] = useState([]);
	const [ids, setIds] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (ids !== "") {
			fetchKirja();
		}
	}, [ids])
	const fetchKirja = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/kirja/haekirja/${ids}`);
			const data = await response.json();
			setKirjat(data);
		}
		catch (err) {
		}
	}

	const TogglePopup = () => {
		setIds(sarja.sarjaid);
		setTimeout(() => {
			setIsOpen(!isOpen);
		}, 200);
	}
	const togglesulje = () => {
		setTimeout(() => {
			setIsOpen(!isOpen);
		}, 200);
	}

	const parsePicturePath = (picture) => {
		const Slash = picture.lastIndexOf("\\");
		if (Slash === -1) {
			return picture;
		}
		return picture.substring(Slash + 1).replace(/\\/g, "/");
	};

	return ( //tämä täytyy miettiä uusiksi, ulkoasu aivan rikki!
		<div>
			{!isOpen ? (
				<div className="card-container">
					<div className="card">
						<div className="card-info">
							<h1>{sarja.Sarjanimi}</h1>
							<img src={parsePicturePath(sarja.image)} alt="img" className="card_img" />
							<button className="lisatietobutton" onClick={TogglePopup}>Lisätietoja</button>
						</div>
					</div>
				</div>
			) : (
				<div className="avattu-sarja-container">
					<h1>{sarja.Sarjanimi}</h1>
					<img className="sarjankuva" src={parsePicturePath(sarja.image)} alt="img" />
					<h2>Kuvaus: </h2>{sarja.Kuvaus}
					<h2>Luokittelu: {sarja.Luokittelu}</h2>
					<div className="sarjantiedot">
						{Array.isArray(kirjat) && kirjat.length > 0 ?
							kirjat.map((kirja) => (
								<div classname="sarjatietoja">
									<img classname="sarjatietoja-img" src={parsePicturePath(kirja.image)} alt="img" className="card_img" />
									<h4>{kirja.title}</h4>
								</div>
							))
							:
							<h2>Sarjalla ei ole vielä kirjoja</h2>
						}
					</div>
					<button onClick={togglesulje}>Sulje</button>
				</div>
			)}
		</div>
	);
}
const SearchBar = ({ onChange }) => {
	return (
		<div className="search-bar-container">
			<label htmlFor="search-input">Hae:</label>
			<input className="search-bar"
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
			<div >
				{Filterserie.length !== 0 ? (
					Filterserie.map((sarja) => (
						<Card key={sarja.id} sarja={sarja} />
					))) : (
					<h2>Valituilla hakuehdoilla ei löytynyt sarjaa</h2>
				)}
			</div>
		</div>
	);
}
export { SearchBar, FrontPage, Card, Sarjat };