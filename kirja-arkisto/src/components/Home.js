import React, { useState, useEffect } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom'
import bg from '../images/background.mp4'
import kuva1 from '../images/HPotterA.jpg'
import kuva2 from '../images/harrypotter.jpg'
import kuva3 from '../images/HPotterC.jpg'
import kuva4 from '../images/networkingkirja.jpg'
import kuva5 from '../images/nootwarejdm6.jpeg'


export const Home = () => {
	return (
		<div className='home-container'>
			<video className='video'
				autoPlay
				loop
				muted
			>
				<source src={bg} type="video/mp4" />
			</video>
			<div className='saateteksti'>
				<h1>Tervetuloa NOOTin kirja-arkiston sivuille!</h1>
				<h2>Näillä sivuilla voit selata sarjoja, kirjoja sekä rakentaa oman kirjastosi!</h2>
				<p>Käyttääksesi kirjaston kaikkia palveluita käyttäjän
					tulee luoda tili ja kirjautua sisään</p>
				<p>Kirjautumissivulle pääset <Link to="/login">tästä</Link></p>
			</div>
			<div className="postaus-container">
				<div className="postaus">
					<h2>Harry Potter ja Azkabanin vanki</h2>
					<h5>Kirjaston lisäys, Tam 18, 2023</h5>
					<img src={kuva1}></img>
					<p>Harry Potter -kirjasarjan kolmas osa. Englanninkielinen alkuteos ilmestyi 8. 
						heinäkuuta 1999 ja suomennos vuonna 2000.
						Kirjasta on tehty myös samanniminen elokuva ja peli.</p>
				</div>
				<div className="postaus">
					<h2>Harry Potter ja viisasten kivi</h2>
					<h5>Kirjaston lisäys, Tam 12, 2023</h5>
					<img src={kuva2}></img>
					<p>J. K. Rowlingin kirjoittaman Harry Potter -kirjasarjan ensimmäinen osa.</p>
				</div>
				<div className="postaus">
					<h2>Harry Potter ja salaisuuksien kammio</h2>
					<h5>Kirjaston lisäys, Tam 9, 2023</h5>
					<img src={kuva3}></img>
					<p>Harry Potter -kirjasarjan toinen osa. Kyseisestä teoksesta on tehty myös elokuva. </p>
				</div>
				<div className="postaus">
					<h2>Computer Networking Problems and Solutions</h2>
					<h5>Kirjaston lisäys, Tam 2, 2023</h5>
					<img src={kuva4}></img>
					<p>Kirjassa syvennytään tietoverkkojen yleisiin ongelmiin ja niiden ratkaisemiseen.</p>
				</div>
				<div className="postaus">
					<h2>Kirjasto avattu</h2>
					<h5>Avauspostaus, Tam 1, 2023 </h5>
					<img src={kuva5}></img>
					<p>NOOTin kirjastopalvelu on avattu!
						Tervetuloa tutustumaan ja käyttämään kirjaston palveluita.
					</p>
				</div>
			</div>
		</div>
	)
}

