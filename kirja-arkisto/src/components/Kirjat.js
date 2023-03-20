import React, { useState, useEffect } from 'react';
import "./Kirjat.css";


export const Kirjat = () => {
	const [kirjat, setKirjat] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		fetchUsers();
	}, [])
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
			{kirjauduttu ? (
				<div id="custom-scrollbars__content" >
					<FrontPage kirjat={kirjat} />
					{/* {kirjat.map((kirja) => (
						<tr>
							<h1>Nimesi on {kirja.title}</h1>
							<h1>Käyttäjänimesi on {kirja.author}</h1>
							<h1>Salasanasi on {kirja.published}</h1>
							<h1>Sähköpostisi on {kirja.pages}</h1>
							<img src={kirja.image}></img>
						</tr>
					))} */}

				</div>
			) : (
				<h1>Kirjaudu sisään nähdäksesi kirjat</h1>
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
const Card = ({ kirja }) => {
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className="card" onClick={togglePopup}>
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
			</div>
		</div>
	);
}
const SearchBar = ({ onChange }) => {
	return (
		<div className="search-bar">
			<label htmlFor="search-input">Search by ID:</label>
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
		<div >
			<SearchBar onChange={setSearchTerm} />
			<div>
				{filteredBooks.map((kirja) => (
					<Card key={kirja.id} kirja={kirja} />
				))}
			</div>
		</div>
	);
}
export { SearchBar, FrontPage, Card, OpenMore };