import React, { useState } from 'react';
import '/src/./App.css';


function SignUpForm ({ setToken }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    // console.log("Error", error)
    // console.log("Success", success)

    async function handleSubmit(e) {
        e.preventDefault();

        if (username.length === 0 || password.length === 0) {
            setError("Username and password are required.");
            return;
           }

        if (username.length < 8) {
            setError("Username must be at least 8 characters.")
            return;
        }   

        if (password.length < 8) {
            setError("Password must be at least 8 characters.")
            return;
        }

        try {
           const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", 
           {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
           });


           const responseData = await response.json();
           console.log(responseData);

           if (responseData.success) {
            setSuccess(responseData.message);
            setError(null); //clear error message
            setToken(responseData.token);
           } else {
            setError("Submit Error: " + responseData.message);
            setSuccess(null); //clear success message
           }
        } catch (error) {
            setError("Submit Error: " + error.message);
            setSuccess(null); //clear success message
        }
    }

    return (
        <div className="form-container">
            <h2>Sign Up!</h2> 
            {error && <p className="error-message">{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>
                        Username: {" "}
                            <input 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        Password: {" "}
                            <input 
                                type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>    
                <button type='submit' className="submit-button">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;

