import React, { useState, useEffect } from 'react';
import "./oma-kirjasto.css";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import kuvaph from '../images/kuvaplaceholder.png'


//https://moog.antikvariaattimakedonia.fi/index.php?sivu=lehdet&moog_sarja_id=342
const OmaKirjasto = ({ UserID }) => {
	const [omatkirjat, setOmatkirjat] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {

	}, []);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/omakirjasto/${UserID}`);
				const data = await response.json();
				setOmatkirjat(data);
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
				})
				.catch(error => {
					console.error(error);
				});
		}
	};

	const parsePicturePath = (picture) => {
		const Slash = picture.lastIndexOf("\\");
		if (Slash === -1) {
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
					<h3>Kirjoittaja:</h3><p>{omakirja.author}</p>
					<button onClick={togglePopup}>Lisätietoja</button>
					{isOpen && <OpenMore
						handleClose={togglePopup}
						content={
							<div className="popupcard">
								<div className="left-column">
									<h1>{omakirja.title}</h1>
									<img src={parsePicturePath(omakirja.image)} />
									<h2>Kirjoittaja:</h2>{omakirja.author}
								</div>
								<div className="omakirja-right-column">
									<div className="omakirja-right-top">
										<h2>Julkaistu:</h2>{omakirja.published}
										<h2>Sivumäärä:</h2>{omakirja.page}
										<h2>Kirjan kunto:</h2>{omakirja.Kunto}
										<h2>Kirjan ostohinta:</h2>{omakirja.Hinta}
										<h2>Ostoaika:</h2>{omakirja.HankintaAika}
									</div>
									<div className="omakirja-right-bottom">
										<h1>Käyttäjän lataamia kuvia</h1>
										<div className="user-pictures">
											<img src={kuvaph} />
											<img src={kuvaph} />
										</div>
									</div>
								</div>
								<button className="lisaa-btn" onClick={DeleteKirja}>Poista omasta kirjastosta</button>
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