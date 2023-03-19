import React, { useState, useEffect } from "react";
import sarja from '../images/kirja.jpg'
import "./sarjat.css";
const mongoose = require('mongoose');

export const Series = [
	{
		sarjaid: 1,
		serie: 'Asterix',
		author: 'Albert Uderzo',
		published: '1959',
		image: 'kirja.jpg',
	},
	{
		sarjaid: 2,
		serie: 'Harry Potter',
		author: 'J.K.Rowling',
		published: '1959',
		image: 'kirja.jpg',
	},
	{
		sarjaid: 3,
		serie: 'Tintin',
		author: 'Unknown',
		published: '1959',
		image: 'kirja.jpg',
	},
	{
		sarjaid: 4,
		serie: 'Donald duck',
		author: 'Walt disney',
		published: '1959',
		image: 'kirja.jpg',
	},
];
const Sarjat = () => {

	const [kirjauduttu, setKirjauduttu] = useState(false);

	useEffect(() => {
		const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
		setKirjauduttu(JSON.parse(kirjautumisdata));
	}, [])

	return (
		<div>
			{kirjauduttu ? (
				<div id="custom-scrollbars__content" >
					<FrontPage />
				</div>
			) : (
				<h1>Kirjaudu sisään nähdäksesi sarjat</h1>
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
const Card = ({ Serie }) => {

	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className="card" onClick={togglePopup}>
			<img src={sarja} alt={sarja} className='card_img' />
			<div className="card-info">
				<h1>{Serie.serie}</h1>
				<p>Author: {Serie.author}</p>
				<p>Published: {Serie.published}</p>
				<p>Pages: {Serie.pages}</p>
				{/* Tähän tulee toinen nappi jolla voit lisätä tämän kyseisen kirjan itsellesi jahka saadaan se mongo toimimaan -Topi */}
				{/* Kyseinen nappi siis lisää tietokantaan tiedon kirjasta jonka halusi lisätä tämä on yksinkertainen Schema ratkasu */}
				{isOpen && <OpenMore
					handleClose={togglePopup}
					content={<div>
						<h1>{Serie.title}</h1>
						<h2>Author: {Serie.author}</h2>
						<h2>Published: {Serie.published}</h2>
						<img src={sarja} alt={sarja} className='popupcard' />
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

const FrontPage = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const Filterserie = Series.filter(serier => {
		return serier.serie.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	})

	return (
		<div >
			<SearchBar onChange={setSearchTerm} />
			<div>
				{Filterserie.map((Serie) => (
					<Card key={Serie.id} Serie={Serie} />
				))}
			</div>
		</div>
	);
}
export { SearchBar, FrontPage, Card, Sarjat, OpenMore };