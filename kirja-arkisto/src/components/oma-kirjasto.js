import React, { useState, useEffect } from 'react';
import "./oma-kirjasto.css";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
			<h1>Oma kirjasto</h1>
			{kirjauduttu ? (
				omatkirjat.length === 0 ? (
					<>
						<h3>Sinulla ei ole vielä yhtään kirjaa omassa kirjastossasi</h3>
						<p>Siirry kirjastoon <Link to="/kirjat">tästä</Link> lisätäksesi kirjoja kirjastoosi</p>
					</>
				) : (
					<FrontPage omatkirjat={omatkirjat} />
				)
			) : (
				<>
					<h1>Sinun on kirjauduttava sisään jotta voit käyttää omaa kirjastoa</h1>
					<Link to="/login">
						<button>Kirjautumissivulle</button>
					</Link>
				</>
			)}
		</div>
	);
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
	const [onnistui, setOnnistui] = useState(null);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}

	const DeleteKirja = async () => {
		if (window.confirm("Haluatko varmasti poistaa kirjan omasta kirjastosta?")) {
			await fetch(
				`http://localhost:5000/api/omakirjasto/${omakirja._id}`,
				{
					method: "DELETE",
				}
			).then(response => {
				if (!response.ok) {
					console.log("vastaus on", response);
					setOnnistui(false);
					throw new Error('Failed to delete book from own library');
				}
				if (response.ok) {
					toast.success('Kirjan poisto omasta kirjastosta onnistui!');
					setOnnistui(true);
				}
				return response.json();
			})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.error(error);
				});
		}
	};

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
					<h2>{omakirja.title}</h2>
					<img src={parsePicturePath(omakirja.image)} alt={omakirja.image} className='card_img' />
					<p>Author: {omakirja.author}</p>
					<p>Published: {omakirja.published}</p>
					<p>Pages: {omakirja.page}</p>
					<button onClick={togglePopup}>Lisätietoja</button>
					{isOpen && <OpenMore
						handleClose={togglePopup}
						content={<div>
							<h1>{omakirja.title}</h1>
							<img src={parsePicturePath(omakirja.image)} className='popupcard' />
							<h2>Author: {omakirja.author}</h2>
							<h2>Published: {omakirja.published}</h2>
							<h2>Pages: {omakirja.page}</h2>
							<button onClick={DeleteKirja}>Poista omasta kirjastosta</button>
							{onnistui == false &&
								<h3 style={{ color: "red" }}>Kirjan poisto ei onnistunut</h3>
							}
							<ToastContainer
								position="bottom-center"
								hideProgressBar={false}
								closeOnClick
								pauseOnHover
								theme="light"
								autoClose={3000} />
							{onnistui &&
								<>
									{setTimeout(() => {
										window.location.href = '/oma-kirjasto';
									}, 3000)}
								</>
							}
						</div>}
					/>}
				</div>
			</div>
		</div>
	);
}
const SearchBar = ({ onChange }) => {
	return (
		<div className="search-bar">
			<label htmlFor="search-input">Hae:</label>
			<input
				id="search-input"
				type="text"
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}

const FrontPage = ({ omatkirjat }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredBooks = omatkirjat.filter(kirja => {
		return kirja.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	})
	return (
		<div>
			<SearchBar onChange={setSearchTerm} />
			<div>
				{filteredBooks.length !== 0 ? (
					filteredBooks.map((omakirja) => (
						<Card key={omakirja.id} omakirja={omakirja} />
					))) : (
					<h2>Valitsemalla hakuehdolla ei löytynyt kirjaa</h2>
				)}
			</div>
		</div>
	);
}
export { OmaKirjasto, FrontPage, OpenMore, Card, SearchBar };