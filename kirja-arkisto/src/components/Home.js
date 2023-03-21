import React, { useState, useEffect } from 'react';
import "./Home.css";
import kirja from '../images/kirja.jpg'
import harrypotter2 from '../images/HPotterC.jpg'
import harrypotter3 from '../images/HPotterA.jpg'
import tero from '../images/Tero.jpg'
import { Link } from 'react-router-dom'


export const Home = () => {
	// const [kirjat, setKirjat] = useState([]);
	// const [error, setError] = useState(null);
	// useEffect(() => {
	// 	fetchUsers();
	// }, [])
	// const fetchUsers = async () => {
	// 	try {
	// 		const response = await fetch("http://localhost:5000/api/kirja/");
	// 		const data = await response.json();
	// 		setKirjat(data);
	// 	}
	// 	catch (err) {
	// 		setError(err);
	// 	}
	// }
	const [kirjauduttu, setKirjauduttu] = useState(false);

	useEffect(() => {
		const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
		setKirjauduttu(JSON.parse(kirjautumisdata));
	}, [])

	return (
		<div>
			<h1>etusivu</h1>
		</div>
	)
}


// export const books = [
// 	{
// 		id: 1,
// 		title: 'The Great Gatsby',
// 		author: 'F. Scott Fitzgerald',
// 		published: '1925',
// 		pages: '180',
// 		image: kirja,
// 	},
// 	{
// 		id: 2,
// 		title: 'To Kill a Mockingbird',
// 		author: 'Harper Lee',
// 		published: '1960',
// 		pages: '281',
// 		image: kirja,
// 	},
// 	{
// 		id: 3,
// 		title: '1984',
// 		author: 'George Orwell',
// 		published: '1949',
// 		pages: '328',
// 		image: kirja,
// 	},
// 	{
// 		id: 4,
// 		title: 'Tero saa turpaan',
// 		author: 'Jukka',
// 		published: '1995',
// 		pages: '2',
// 		image: tero,
// 	},
// 	{
// 		id: 5,
// 		title: 'Tero saa turpaan2',
// 		author: 'Jukka',
// 		published: '2000',
// 		pages: '666',
// 		image: tero,
// 	},
// 	{
// 		id: 6,
// 		title: 'Tero saa turpaan3',
// 		author: 'Jukka',
// 		published: '2021',
// 		pages: '69',
// 		image: tero,
// 	},
// 	{
// 		id: 7,
// 		title: 'Harry Potter and the sorcerers Stone',
// 		author: 'J.K.Rowling',
// 		published: '1995',
// 		pages: '400',
// 		image: harrypotter,
// 		sarjaid: 2,

// 	},
// 	{
// 		id: 8,
// 		title: 'Harry Potter and the chamber of secrets',
// 		author: 'J.K.Rowling',
// 		published: '1995',
// 		pages: '452',
// 		image: harrypotter2,
// 		sarjaid: 2,
// 	},
// 	{
// 		id: 9,
// 		title: 'Harry Potter and the prisoner of Azkaban',
// 		author: 'J.K.Rowling',
// 		published: '1995',
// 		pages: '652',
// 		image: harrypotter3,
// 		sarjaid: 2,
// 	},
// ];
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