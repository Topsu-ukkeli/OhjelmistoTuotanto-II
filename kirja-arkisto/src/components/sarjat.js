import React, { useState } from "react";
const Sarjat = () => {

    const [tiedotTaulu, setTiedottaulu] = useState([]);


    return (
        <>
            <table>
                <tbody >
                    <tr>
                        <th><h1>Nimi</h1></th>
                        <th><h1>Ilmestysvuodet</h1></th>
                    </tr>
                    <tr>
                        <td style={{ padding: "20px" }}><h1>Tähän tulee tietoa</h1></td> 
                        {/* tähän pitää mappailla tiedot tietokannasta */}
                        <td><h1>Tähän tulee julkaisuvuodet</h1></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export { Sarjat };