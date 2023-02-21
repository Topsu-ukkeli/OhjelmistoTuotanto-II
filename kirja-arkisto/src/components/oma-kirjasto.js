import React, { useState, useEffect } from 'react';
import "./oma-kirjasto.css";

//https://moog.antikvariaattimakedonia.fi/index.php?sivu=lehdet&moog_sarja_id=342
const OmaKirjasto = () => {

    const [kirjauduttu, setKirjauduttu] = useState(false);

    useEffect(() => {
        const kirjautumisdata = localStorage.getItem('KIRJAUDUTTU_DATA');
        setKirjauduttu(JSON.parse(kirjautumisdata));
    }, [] )

    return (
        <>
            {!kirjauduttu &&
                <h1>Kirjaudu sisään käyttääksesi omaa kirjastoa</h1>
            }
            {kirjauduttu &&
                <h1>Oma kirjasto tähän</h1>
            }
        </>
    )
}
export { OmaKirjasto };