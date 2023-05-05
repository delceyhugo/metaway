import './Login.scss';
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("password");
    const [alert, setAlert] = useState("Account already exist")
    const [alertState, setAlertState] = useState("")
    let navigate = useNavigate();


    const submit = (e, username, password) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + '/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: username, password: password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.error?.nextValidRequestDate !== undefined){
                let date = new Date(data.error.nextValidRequestDate)
                let dateString = `Retry in ${Math.floor(Math.abs(new Date() - date)/1000/60)}:${Math.floor(Math.abs(new Date() - date)/1000%60)}`
                var returnString = data.error.text + ' ' + dateString
            }
            showAlert(data.error ? (data.error.text ? returnString : data.error) : data.message)
            if(data.token){
                localStorage.setItem("auth", JSON.stringify({token: data.token, userId: data.userId, username: data.username}))
                if(data.perm >= 2){
                    // redirect("/admin")
                    return navigate("/admin");
                }else{
                    // redirect("/")
                    return navigate("/");
                }
            }
        })
    }
    const showAlert = (msg) =>{
        setAlert(msg)
        setAlertState('')
        setTimeout(() => setAlertState('fade-in-out'), 0);
        
    }


    return (
        <div className="Login">
            <div className='wrapper'>
                <div className='container'>
                    <h2>Sign In</h2>
                    <p>Login for developers only</p>
                    <form onSubmit={(e) => {submit(e, username, password)}}> 
                        <div className="section">
                            <img src="https://img.icons8.com/material/24/D9E3EA/user-male-circle--v1.png" alt='User icon'/>
                            <input id="username-input" value={username} onChange={(e) => setUsername(e.target.value)} minLength="3" required="required" spellCheck="false" autoComplete="false" type="text"/>
                        </div>
                        <div className="section">
                            <img src="https://img.icons8.com/material/24/D9E3EA/key--v1.png" alt='Password icon'/>
                            <input id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" required="required" spellCheck="false" autoComplete="false" type={showPassword}/>
                            <img className='show-password' onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')} src="https://img.icons8.com/material/24/D9E3EA/visible--v1.png" alt='Show'/>
                        </div>
                        <div className="button">
                            <input className="button-b" type="submit" value="Sign In" />
                        </div>
                        <div className={`alert ${alertState}`}>
                            <p>{alert}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}