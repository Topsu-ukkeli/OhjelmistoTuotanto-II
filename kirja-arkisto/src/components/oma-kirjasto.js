import React, { useState } from 'react';
import "./oma-kirjasto.css";

//https://moog.antikvariaattimakedonia.fi/index.php?sivu=lehdet&moog_sarja_id=342
const OmaKirjasto = () => {

    const [kirjauduttu, setKirjauduttu] = useState(false);

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