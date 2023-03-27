import React, { useState, useEffect } from 'react';
import "./Kirjat.css";
import { Link } from 'react-router-dom'


const Kirjat = ({ UserID }) => {
	const [kirjat, setKirjat] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {

	}, []);
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
	const [kirjauduttu, setKirjauduttu] = useState(false);

	useEffect(() => {
		const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
		setKirjauduttu(JSON.parse(kirjautumisdata));
	}, [])

	return (
		<div className="kirjat-container">
			<FrontPage kirjat={kirjat} UserID={UserID} />
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
const Card = ({ kirja, UserID }) => {
	const [query, setQuery] = useState("");
	const [find, setFind] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [omatkirjat, setOmatkirjat] = useState([]);
	const [error, setError] = useState(null);
	const AddtoOwn = () => {
		console.log("muuttuuko tämä", omatkirjat);
		const newBook = {
			title: kirja.title,
			author: kirja.author,
			published: kirja.published,
			page: kirja.page,
			image: kirja.image,
			sarjaid: kirja.sarjaid,
			UserID: UserID,
		};
		console.log(UserID);
		fetch("http://localhost:5000/api/omakirjasto/createOmakirjasto", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newBook)
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.error(error));
	}


	const togglePopup = () => {
		setIsOpen(!isOpen);
	}

	const parsePicturePath = (picture) => {
		const Slash = picture.lastIndexOf("\\");
		if (Slash === -1) {
			console.log(picture);
			return picture;
		}
		return picture.substring(Slash + 1).replace(/\\/g, "/");
	};

	return (
		<div className="card-container">
			<div className="card">
				<div className="card-info">
					<h2>{kirja.title}</h2>
					<img src={parsePicturePath(kirja.image)} alt="img" className="card_img" />
					<p>Author: {kirja.author}</p>
					<p>Published: {kirja.published}</p>
					<p>Pages: {kirja.page}</p>
					<button onClick={togglePopup}>Lisätietoja</button>
					{isOpen && <OpenMore
						handleClose={togglePopup}
						content={<div>
							<h1>{kirja.title}</h1>
							<img src={parsePicturePath(kirja.image)} className='popupcard' />
							<h2>Author: {kirja.author}</h2>
							<h2>Published: {kirja.published}</h2>
							<h2>Pages: {kirja.page}</h2>
							<h2>Kirjan kuvaus:<br/>{kirja.kuvaus}</h2>
							<h2>Kirjan kuvituksen on piirtäny <br/> {kirja.piirtajat}</h2>
							<button onClick={AddtoOwn}>Lisää omaan kirjastoon</button>
						</div>}
					/>}
				</div>
			</div>
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

const FrontPage = ({ kirjat, UserID }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const filteredBooks = kirjat.filter(kirja => {
		return kirja.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	})

	return (
		<div>
			<h1>Kirjat</h1>
			<SearchBar onChange={setSearchTerm} />
			<div>
				{filteredBooks.map((kirja) => (
					<Card key={kirja.id} kirja={kirja} UserID={UserID} />
				))}
			</div>
		</div>
	);
}
export { Kirjat, SearchBar, FrontPage, Card, OpenMore };