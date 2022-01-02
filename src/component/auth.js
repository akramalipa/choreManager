import React, { useState, useEffect } from "react"; 
import API from "./api-service";
import { encode as base64_encode } from "base-64";


  /* Comments Section:  
    1. First screen of the application
    2. Only TM1 native authentication supported
    3. Token is set here and used as a cookies in all modules
    4. can be extended to other authentication as cookies is captured and used
    */

import { useCookies } from 'react-cookie';

function Authentication() {

    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    const encodedCredentials = base64_encode(username +":"+ password);
    const authToken = 'Basic ' + encodedCredentials;
         

    const [token, setToken] = useCookies(['mr-token']);

    useEffect ( () => {
        if(token['mr-token']) window.location.href = '/chores';
    }, [token])

    const loginClicked = () => {

        API.loginUser(authToken)
        .then(resp => setToken('mr-token', authToken))
        .catch (error => console.log(error))

    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>Login</h1>
            </header>
            <div className="login-container">
                <label htmlfor="username"> username </label><br/>
                <input id="username" type="text" placeholder="username" 
                    value={username} 
                    onChange={ evt => setUsername (evt.target.value)}></input><br/>
                <label htmlfor="password">password</label><br/>
                <input id="password" type="password" placeholder="password" 
                    value={password} 
                    onChange={ evt => setPassword (evt.target.value)}></input><br/>
                <button onClick={loginClicked}>Login</button>
            </div>

            
                    
        </div>
    )
}

export default Authentication;