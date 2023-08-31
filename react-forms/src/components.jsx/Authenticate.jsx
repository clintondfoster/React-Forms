import React from 'react';
import { useState } from 'react';


function Authenticate ({ token }) {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", 
            {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }); 
            const responseData = await response.json();

            if (response.ok) {
                setSuccess(responseData.message);
                setError(null); 
                setUsername(responseData.data.username); //set the username
            } else {
                setError("Athentication error: " + responseData.message);
                setSuccess(null);
            }
        } catch (error) {
            setError("Authentication error:" + error.message);
            setSuccess(null);
        }
    }

    return (
        <div>
            <h2>Authenticate</h2>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
            {username && <p>Logged in as: {username}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    );
}

export default Authenticate;