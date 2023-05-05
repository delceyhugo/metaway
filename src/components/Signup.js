import './Login.scss';
import React, {useState} from 'react';

export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState("Account already exist")
    const [alertState, setAlertState] = useState("")
    const [alertColor, setAlertColor] = useState({color: "#a03535"})

    
    const [showPassword, setShowPassword] = useState("password");
    
    const submit = (e, username, password, email) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + '/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, username: username, password: password})
        
        })
        .then(res => res.json())
        .then(data => showAlert(data.error ? data.error : data.message, data.error ? '#a03535' : '#097969')) 

    }
    const showAlert = (msg, color) =>{
        setAlertColor({color: color})
        setAlert(msg)
        setAlertState('')
        setTimeout(() => setAlertState('fade-in-out'), 0);
    }


    return (
        <div className="Login">
            <div className='wrapper'>
                <div className='container'>
                    <h2>Sign Up</h2>
                    <p>Registration only open for developers</p>
                    <form onSubmit={(e) => {submit(e, username, password, email)}}>
                        <div className="section">
                            <img src="https://img.icons8.com/material/24/D9E3EA/user-male-circle--v1.png" alt='User icon'/>
                            <input id="username-input" value={username} onChange={(e) => setUsername(e.target.value)} minLength="3" required="required" spellCheck="false" autoComplete="false" type="text"/>
                        </div>
                        <div className="section">
                            <img src="https://img.icons8.com/material/24/D9E3EA/filled-message--v1.png" alt='Email icon'/>
                            <input id="Email-input" value={email} onChange={(e) => setEmail(e.target.value)} minLength="3" required="required" spellCheck="false" autoComplete="false" type="email"/>
                        </div>
                        <div className="section">
                            <img src="https://img.icons8.com/material/24/D9E3EA/key--v1.png" alt='Password icon'/>
                            <input id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" required="required" spellCheck="false" autoComplete="false" type={showPassword}/>
                            <img className='show-password' onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')} src="https://img.icons8.com/material/24/D9E3EA/visible--v1.png" alt='Show'/>
                        </div>
                        <div className="button">
                            <input className="button-b" type="submit" value="Sign Up" />
                        </div>
                        <div className={`alert ${alertState}`}>
                            <p style={alertColor} >{alert}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}