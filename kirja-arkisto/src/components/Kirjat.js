import React, { useState, useEffect } from 'react';
import "./Kirjat.css";
import { Link } from 'react-router-dom'


export const Kirjat = () => {
	const [kirjat, setKirjat] = useState([]);
	const [error, setError] = useState(null);
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
		<div>
			<div id="custom-scrollbars__content" >
				<FrontPage kirjat={kirjat} />
			</div>
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
const Card = ({ kirja }) => {
	const [query, setQuery] = useState("");
	const [find, setFind] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [omatkirjat, setOmatkirjat] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		fetchOwn();
	}, [])
	const fetchOwn = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/omakirjasto/");
			const data = await response.json();
			setOmatkirjat(data);
			console.log(omatkirjat);
		}
		catch (err) {
			setError(err);
		}
	}
	const AddtoOwn = () => {
		console.log("muuttuuko tämä", omatkirjat);
		omatkirjat.map((omakirja) => {
			if (omakirja.title === kirja.title) {
				setFind(omakirja.title);
			}
		})
		if (find !== kirja.title) {
			const newBook = {
				title: kirja.title,
				author: kirja.author,
				published: kirja.published,
				sivut: kirja.page,
				image: kirja.image,
				sarjaid: kirja.sarjaid,
			};
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
		else {
			console.log("Kirja löytyy jo omista kirjoista!");
		}
	}
	const DeleteKirja = async (kirja) => {
		await fetch(
			`http://localhost:5000/api/kirja/deletekirja/${kirja._id}`,
			{
				method: "DELETE",
			}
		);

	};
	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div>
			<div className="card">
				<img src={kirja.image} alt={kirja.image} className='card_img' />
				<div className="card-info">
					<h2>{kirja.title}</h2>
					<p>Author: {kirja.author}</p>
					<p>Published: {kirja.published}</p>
					<p>Pages: {kirja.pages}</p>
					{isOpen && <OpenMore
						handleClose={togglePopup}
						content={<div>
							<h1>{kirja.title}</h1>
							<h2>Author: {kirja.author}</h2>
							<h2>Published: {kirja.published}</h2>
							<h2>Pages: {kirja.pages}</h2>
							<img src={kirja.image} className='popupcard' />
						</div>}
					/>}
					<div>
						<button onClick={togglePopup}>Lisätietoja</button>
						<br />
						<button onClick={AddtoOwn}>Lisää kirja omaan kirjastoon</button>
						<br />
						<button onClick={() => DeleteKirja(kirja)}>VAIN ADMIN VOI POISTAA!</button>
					</div>
				</div>
			</div>
		</div>
	);
}
const SearchBar = ({ onChange }) => {
	return (
		<div className="search-bar">
			<label htmlFor="search-input">Hae kirjaa</label>
			<input
				id="search-input"
				type="text"
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}

const FrontPage = ({ kirjat }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredBooks = kirjat.filter(kirja => {
		return kirja.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	})

	return (
		<div>
			<SearchBar onChange={setSearchTerm} />
			<div className="nappiContainer">
				<Link to="/Kirjalisaus">
				<button>Lisää uusi kirja</button>
				</Link>
			</div>
			<div>
				{filteredBooks.map((kirja) => (
					<Card key={kirja.id} kirja={kirja} />
				))}
			</div>
		</div>
	);
}
export { SearchBar, FrontPage, Card, OpenMore };