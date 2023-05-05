import mainLogo from'../assets/Raw_Transparent_Crop.png';
import React, {useState, useEffect} from 'react';
import './Header.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Header() {
    const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')));
    let location = useLocation();

    useEffect(() => {
        setAuth(JSON.parse(window.localStorage.getItem('auth')))
    }, [location])


    let navigate = useNavigate();
    const logOut = (e) => {
        e.preventDefault()
        window.localStorage.removeItem('auth')
        setAuth(undefined)
        return navigate("/login");
    }

    return (
        <div className="Header">
            <nav>
                <Link to="/">
                    <img className="logo" src={mainLogo} alt="Logo" />
                </Link>
                <ul>
                    <li>
                        {auth ? <Link className="button-a" to="/admin">{auth.username}</Link> : <Link className="button-a" to="/login">Sign in</Link>}
                    </li>
                    <li>
                        {auth ? <Link onClick={logOut} className="button-b" to="/signup">Log out</Link> : <Link className="button-b" to="/signup">Sign up</Link>}
                    </li>
                </ul>
            </nav>
        </div>
    );
}