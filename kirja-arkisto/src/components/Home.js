import React, { useState, useEffect } from 'react';
import "./Home.css";
import kirja from '../images/kirja.jpg'
import harrypotter2 from '../images/HPotterC.jpg'
import harrypotter3 from '../images/HPotterA.jpg'
import tero from '../images/Tero.jpg'
import { Link } from 'react-router-dom'
import bg from '../images/background.mp4'


export const Home = () => {
	const [kirjauduttu, setKirjauduttu] = useState(false);

	useEffect(() => {
		const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
		setKirjauduttu(JSON.parse(kirjautumisdata));
	}, [])

	return (
		<div>
			<video
				autoPlay
				loop
				muted
				style={{
					position: "absolute",
					width: "100%",
					left: "50%",
					top: "50%",
					height: "100%",
					objectFit: "cover",
					transform: "translate(-50%, -50%)",
					zIndex: "-1",
					overflow: "hidden",
				}}
			>
				<source src={bg} type="video/mp4" />
			</video>
			<div className='home-container'>
				<div className='saateteksti'>
					<h1>Tervetuloa NOOTin kirja-arkiston sivuille!</h1>
					<h2>Näillä sivuilla voit selata sarjoja, kirjoja sekä rakentaa oman kirjastosi!</h2>
					<p>Käyttääksesi kirjaston kaikkia palveluita käyttäjän
						tulee luoda tili ja kirjautua sisään</p>
					<p>Kirjautumissivulle pääset <Link to="/login">tästä</Link></p>
				</div>
			</div>
		</div>
	)
}


{/* <div className="tausta"
style={{
backgroundImage: `url(${bg})`
}}> */}