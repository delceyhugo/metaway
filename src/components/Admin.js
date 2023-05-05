import './Admin.scss';
import React, {useState, useEffect} from 'react';
import Keys from './Admin/Keys';
import Players from './Admin/Players';
import General from './Admin/General';
import Users from './Admin/Users';

import { redirect } from "react-router-dom";

export default function Admin() {
    const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')));
    const [tabs, setTabs] = useState(0);


    useEffect(() => {
        if(auth === null){
            throw redirect("/login")
        }
    }, [])

    const changeTabs = (e, tab) => {
        e.preventDefault()
        setTabs(tab)
    }



    return (
        <div className="Admin">
            <h1>Admin</h1>
            <nav>
                <ul>
                    <li onClick={(e) => changeTabs(e, 0)} className={tabs == 0 ? 'button-c' : 'button-a'}>General</li>
                    <li onClick={(e) => changeTabs(e, 1)} className={tabs == 1 ? 'button-c' : 'button-a'}>Players</li>
                    <li onClick={(e) => changeTabs(e, 2)} className={tabs == 2 ? 'button-c' : 'button-a'}>Keys</li>
                    <li onClick={(e) => changeTabs(e, 3)} className={tabs == 3 ? 'button-c' : 'button-a'}>Users</li>
                </ul>
            </nav>
            <div className='wrapper'>
                {tabs == 0 ? <General/> : null}
                {tabs == 1 ? <Players/> : null}
                {tabs == 2 ? <Keys/> : null}
                {tabs == 3 ? <Users/> : null}
            </div>




            {/* <button onClick={getAllUsers} className='button-b'>Get all users</button>
            <button className='button-b'>Generate keys</button>
            <button className='button-b'>Get all keys</button> */}
        </div>
    );
}