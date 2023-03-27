import React, { useState, useEffect } from 'react';
import "./oma-kirjasto.css";
import { Link } from 'react-router-dom'


//https://moog.antikvariaattimakedonia.fi/index.php?sivu=lehdet&moog_sarja_id=342
const OmaKirjasto = ({ UserID }) => {
	console.log("Käyttäjä", UserID);
	const [omatkirjat, setOmatkirjat] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {

	}, []);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				console.log(UserID);
				const response = await fetch(`http://localhost:5000/api/omakirjasto/${UserID}`);
				const data = await response.json();
				setOmatkirjat(data);
				console.log("omatkirjat", omatkirjat);
			}
			catch (err) {
				setError(err);
			}
		}
		if (UserID) {
			fetchUsers();
		}

	}, [UserID])
	

	const [kirjauduttu, setKirjauduttu] = useState(false);

	useEffect(() => {
		const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
		setKirjauduttu(JSON.parse(kirjautumisdata));
	}, [])



	return (
		<div className="omakirjasto-container">
			{kirjauduttu ? (
				<FrontPage omatkirjat={omatkirjat} />
			) : (
				<>
					<h1>Sinun on kirjauduttava sisään jotta voit käyttää omaa kirjastoa</h1>
					<Link to="/login">
						<button>Kirjautumissivulle</button>
					</Link>
				</>
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
const Card = ({ omakirja }) => {
	const [isOpen, setIsOpen] = useState(false);

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
	
	const handleRemoveFromOwn = () => {
		console.log("kirja pitäs varmaan poistaa omastakirjastosta");
		};
		
	return (
		<div className="card-container">
			<div className="card">
				<div className="card-info">
					<h2>{omakirja.title}</h2>
					<img src={parsePicturePath(omakirja.image)} alt={omakirja.image} className='card_img' />
					<p>Author: {omakirja.author}</p>
					<p>Published: {omakirja.published}</p>
					<p>Pages: {omakirja.pages}</p>
					<button onClick={togglePopup}>Lisätietoja</button>
					{isOpen && <OpenMore
						handleClose={togglePopup}
						content={<div>
							<h1>{omakirja.title}</h1>
							<img src={parsePicturePath(omakirja.image)} className='popupcard' />
							<h2>Author: {omakirja.author}</h2>
							<h2>Published: {omakirja.published}</h2>
							<h2>Pages: {omakirja.page}</h2>
							<button onClick={handleRemoveFromOwn}>Poista omasta kirjastosta</button>
						</div>}
					/>}
				</div>
			</div>
		</div>
	);
}
// const SearchBar = ({ onChange }) => {
// 	return (
// 		<div className="search-bar">
// 			<label htmlFor="search-input">Search by ID:</label>
// 			<input
// 				id="search-input"
// 				type="text"
// 				onChange={(event) => onChange(event.target.value)}
// 			/>
// 		</div>
// 	);
// }

const FrontPage = ({ omatkirjat }) => {
	// const [searchTerm, setSearchTerm] = useState('');

	// const filteredBooks = omatkirjat.filter(kirja => {
	// 	return kirja.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	// })

	return (
		<div>
			<h1>Oma kirjasto</h1>
			{/* <SearchBar onChange={setSearchTerm} /> */}
			<div>
				{omatkirjat.map((omakirja) => (
					<Card key={omakirja.id} omakirja={omakirja} />
				))}
			</div>
		</div>
	);
}
export { OmaKirjasto, FrontPage, OpenMore, Card };