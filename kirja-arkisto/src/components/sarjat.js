import React, { useState } from "react";
import {books} from './Home.js'
import kirja from '../images/kirja.jpg'
import "./sarjat.css";
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
})

const Sarjat = () => {

    const [tiedotTaulu, setTiedottaulu] = useState([]);

    return (
        <>
        <FrontPage/>
            <table>
                <tbody >
                    <tr>
                        <th><h1>Nimi</h1></th>
                        <th><h1>Ilmestysvuodet</h1></th>
                    </tr>
                    <tr>
                        <td style={{ padding: "20px" }}><h1>Tähän tulee tietoa</h1></td>
                        {/* tähän pitää mappailla tiedot tietokannasta */}
                        <td><h1>Tähän tulee julkaisuvuodet</h1></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
const Card = ({ book }) => {
	return (
		<div className="card" >
			<img src={kirja} alt={kirja} className='card_img' />
			<div className="card-info">
				<h2>{book.title}</h2>
				<p>Author: {book.author}</p>
				<p>Published: {book.published}</p>
				<p>Pages: {book.pages}</p>
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
export { SearchBar, FrontPage, Card,Sarjat };