//TÄNNE ADMIN OIKEUKSILLA TOIMIVAT JUTUT
import React, { useState, useEffect } from 'react';


const Admin = () => {
    const [kirjat, setKirjat] = useState([]);
    const [error, setError] = useState(null);
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
    const DeleteKirja = async (kirja) => {
        await fetch(
            `http://localhost:5000/api/kirja/deletekirja/${kirja._id}`,
            {
                method: "DELETE",
            }
        );

    };
    return (
        <div>
            {kirjat.map((kirja) => (
                <button onClick={() => DeleteKirja(kirja)}>VAIN ADMIN VOI POISTAA!</button>
            ))}
        </div>
    )
}
export { Admin }