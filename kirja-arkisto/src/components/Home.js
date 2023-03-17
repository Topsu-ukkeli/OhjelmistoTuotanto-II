import React from 'react';
import "./Home.css";
import kirja from '../images/kirja.jpg'


export const Home = () => {
	return (
		<div className='wrapper'>
			<Card
				title="harry potter ja viisasten transporter"
				desc="Kirja kertoo siitä kuinka harry osti ruosteisen transporterin" />
			<Card
				title="Longin levitys 105"
				desc="Teppo heittää maidon longi ovilta ja mikko piikka ja muuta pelaa anti valoo" />
			<Card
				title="Kirja tässä tosiaan"
				desc="JÖÖ KIRJAA RÖH KÖH" />
		</div>
	);
};

function Card(props) {
	return (
		<div className='card'>
			<div className='cardbody'>
				{/* muokataan kuvan tuontia vielä. tämä on vain esimerkki */}
				<img src={kirja} alt="kirja" className='card_img'></img>
				<h2 className='cardtitle'>{props.title}</h2>
				<p className='carddesc'>{props.desc}</p>
			</div>
			<button className='cardbtn' >Lisätiedot</button>
		</div>
	)
}
