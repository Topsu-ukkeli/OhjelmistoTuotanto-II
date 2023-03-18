import React, { useState } from "react";
import { books } from './Home.js'
import kirja from '../images/kirja.jpg'
import kirja2 from	'../images/2.jpg'
import "./sarjat.css";
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const orderSchema = new Schema({

})

const Sarjat = () => {

	const [tiedotTaulu, setTiedottaulu] = useState([]);

	return (
		<div>
			<FrontPage />
		</div>
	)
}

const OpenMore = props => {
	return(
		<div className="popup-box">
			<div className="box">
				<button className="btn-close" onClick={props.handleClose}>sulje</button>
				{props.content}
			</div>
		</div>
	)
}
const Card = ({ book }) => {

	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className="card" >
			<img src={kirja} alt={kirja} className='card_img' />
			<div className="card-info">
				<h1>{book.title}</h1>
				<p>Author: {book.author}</p>
				<p>Published: {book.published}</p>
				<p>Pages: {book.pages}</p>
				<button onClick={togglePopup}>Lisätietoja</button>
				{isOpen && <OpenMore
				handleClose = {togglePopup}
				content = {<div>
					<h1>{book.title}</h1>
					<h2>Author: {book.author}</h2>
					<h2>Published: {book.published}</h2>
					<h2>Pages: {book.pages}</h2>
					<img src={kirja} alt={kirja} className='popupcard' />
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

	const filteredBooks = books.filter((book) =>
		book.id.toString().startsWith(searchTerm)
	);

	return (
		<div >
			<SearchBar onChange={setSearchTerm} />
			<div>
				{filteredBooks.map((book) => (
					<Card key={book.id} book={book} />
				))}
			</div>
		</div>
	);
}
export { SearchBar, FrontPage, Card, Sarjat,OpenMore};