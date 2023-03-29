import React, { useState, useEffect } from 'react';
import "./Kirjat.css";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Kirjat = ({ UserID }) => {
	const [kirjat, setKirjat] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {

	}, []);
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
		<div className="kirjat-container">
			<FrontPage kirjat={kirjat} UserID={UserID} />
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
const Card = ({ kirja, UserID }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [onnistui, setOnnistui] = useState(null);

	const AddtoOwn = () => {
		const Kunto = prompt("Anna kirjan kunto asteikolla 1-5")
		const Hinta = prompt("Anna kirjan ostohinta")
		const HankintaAika = prompt("Hankinta-aika muodossa dd.MM.yyyy")
		const newBook = {
			title: kirja.title,
			author: kirja.author,
			published: kirja.published,
			page: kirja.page,
			image: kirja.image,
			sarjaid: kirja.sarjaid,
			UserID: UserID,
			Kunto: Kunto,
            Hinta: Hinta,
            HankintaAika:HankintaAika,
		};
		console.log(UserID);
		fetch("http://localhost:5000/api/omakirjasto/createOmakirjasto", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newBook)
		})
			.then(response => {
				if (!response.ok) {
					console.log("vastaus on", response);
					setOnnistui(false);
					throw new Error('Failed to add book to own library');
				}
				if (response.ok) {
					toast.success('Kirjan lisäys onnistui!');
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

	return (
		<div className="card-container">
			<div className="card">
				<div className="card-info">
					<h2>{kirja.title}</h2>
					<img src={parsePicturePath(kirja.image)} alt="img" className="card_img" />
					<h3>Kirjoittaja</h3> <p>{kirja.author}</p>
					<button onClick={togglePopup}>Lisätietoja</button>
					{isOpen && <OpenMore
						handleClose={togglePopup}
						content={
							<div className="popupcard">
								<div className="left-column">
									<h1>{kirja.title}</h1>
									<img src={parsePicturePath(kirja.image)} />
								</div>
								<div className="right-column">
									<h2>Kirjoittaja</h2><p>{kirja.author}</p>
									<h2>Julkaistu</h2><p>{kirja.published}</p>
									<h2>Sivumäärä</h2><p>{kirja.page}</p>
									<h2>Kirjan kuvaus </h2><p>{kirja.kuvaus}</p>
									<h2>Kirjan kuvituksen on piirtänyt</h2><p>{kirja.piirtajat}</p>
								</div>
								<button className="lisaa-btn" onClick={AddtoOwn}>Lisää omaan kirjastoon</button>
								{onnistui == false &&
									<h3 style={{ color: "red" }}>Kirjan lisäys ei onnistunut</h3>
								}
								<ToastContainer
									position="bottom-center"
									hideProgressBar={false}
									closeOnClick
									pauseOnHover
									theme="light"
									autoClose={5000} />
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

const FrontPage = ({ kirjat, UserID }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const filteredBooks = kirjat.filter(kirja => {
		return kirja.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	})

	return (
		<div>
			<h1>Kirjat</h1>
			<SearchBar onChange={setSearchTerm} />
			<Link to="/kirjalisaus">
				<button>Lisää kirja kirjastoon</button>
			</Link>
			<div>
				{filteredBooks.length !== 0 ? (
					filteredBooks.map((kirja) => (
						<Card key={kirja.id} kirja={kirja} UserID={UserID} />
					))) : (
					<h2>Valitsemalla hakuehdolla ei löytynyt kirjaa</h2>
				)}
			</div>

		</div>
	);
}
export { Kirjat, SearchBar, FrontPage, Card, OpenMore };