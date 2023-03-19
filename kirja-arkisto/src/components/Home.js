import React, { useState, useEffect } from 'react';
import "./Home.css";
import kirja from '../images/kirja.jpg'
import harrypotter from '../images/HPotter.jpg'

export const books = [
	{
		id: 1,
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		published: '1925',
		pages: '180',
		image: kirja,
	},
	{
		id: 2,
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		published: '1960',
		pages: '281',
		image: kirja,
	},
	{
		id: 3,
		title: '1984',
		author: 'George Orwell',
		published: '1949',
		pages: '328',
		image: kirja,
	},
	{
		id: 4,
		title: '2001',
		author: 'Tero saa turpaan',
		published: '1995',
		pages: '242',
		image: kirja,
	},
	{
		id: 5,
		title: 'Harry Potter and the chamber of secrets',
		author: 'J.K.Rowling',
		published: '1995',
		pages: '242',
		image: harrypotter	,
		sarjaid: 2,
	},
	{
		id: 6,
		title: 'Harry Potter and the philosophers Stone',
		author: 'J.K.Rowling',
		published: '1995',
		pages: '242',
		image: harrypotter,
		sarjaid: 2,
	},
	{
		id: 7,
		title: 'Harry Potter and the prisoner of Azkaban',
		author: 'J.K.Rowling',
		published: '1995',
		pages: '242',
		image: harrypotter,
		sarjaid: 2,
	},
];
export const Home = () => {

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
const Card = ({ book }) => {
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className="card" onClick={togglePopup}>
			<img src={book.image} className='card_img' />
			<div className="card-info">
				<h2>{book.title}</h2>
				<p>Author: {book.author}</p>
				<p>Published: {book.published}</p>
				<p>Pages: {book.pages}</p>
				{isOpen && <OpenMore
					handleClose={togglePopup}
					content={<div>
						<h1>{book.title}</h1>
						<h2>Author: {book.author}</h2>
						<h2>Published: {book.published}</h2>
						<h2>Pages: {book.pages}</h2>
						<img src={book.image} className='popupcard' />
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

	const filteredBooks = books.filter(book => {
		 return book.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	})

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
export { SearchBar, FrontPage, Card, OpenMore };

// 	const [searchResult, setSearchResult] = useState('');

// 	const handleSearch = (searchQuery) => {
// 		console.log(searchQuery);
// 		const search = props.id;
// 	};
// 	return (
// 		<div className='wrapper'>
// 			<header className='headers'>
// 				<SearchBar handleSearch={handleSearch} />
// 			</header>
// 			<Card
// 				id="1"
// 				title="harry potter ja viisasten transporter"
// 				desc="Kirja kertoo siitä kuinka harry osti ruosteisen transporterin" />
// 			<Card
// 				id="2"
// 				title="Longin levitys 105"
// 				desc="Teppo heittää maidon longi ovilta ja mikko piikka ja muuta pelaa anti valoo" />
// 			<Card
// 				id="3"
// 				title="Kirja tässä tosiaan"
// 				desc="JÖÖ KIRJAA RÖH KÖH" />
// 		</div>
// 	);
// function Card(props) {

// 	const showMore = () => {

// 	}
// 	return (
// 		<div className='card'>
// 			<div className='cardbody'>
// 				{/* muokataan kuvan tuontia vielä. tämä on vain esimerkki */}
// 				<img src={kirja} alt="kirja" className='card_img'></img>
// 				<h2 className='cardtitle'>{props.title}</h2>
// 				<p className='carddesc'>{props.desc}</p>
// 			</div>
// 			<button className='cardbtn' onClick={showMore} >Lisätiedot</button>
// 		</div>
// 	)
// }
// function SearchBar(props) {
// 	const [searchQuery, setSearchQuery] = useState('');

// 	const handleSearch = () => {
// 		props.handleSearch(searchQuery);
// 	};

// 	const handleChange = (event) => {
// 		setSearchQuery(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<input type="text" value={searchQuery} onChange={handleChange} />
// 			<button onClick={handleSearch}>Search</button>
// 		</div>
// 	);
// }