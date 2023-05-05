import React, {useState, useEffect} from 'react';

export default function Players() {
    const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')));
    const [data, setData] = useState([])

    useEffect(() => {
        if(auth === null){
            window.history.pushState({}, undefined, "/login")
            window.location.reload()
        }else{
            getAllPlayers()
        }
    }, [])


    const getAllPlayers = () => {

        fetch(process.env.REACT_APP_APIURL + '/access/getPlayers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                window.history.pushState({}, undefined, "/login")
                window.location.reload()
            }
            else{
                setData(data)
            }
        })
    }

    return (
        <div className="Players">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Players</th>
                        </tr>
                        <tr>
                            <th>SteamID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((el, index) => {
                        return (
                        <tr key={index}>
                            <td>{el.steamid}</td>
                            <td>{el.date}</td>
                        </tr>
                        )}
                    )}

                    </tbody>
                </table>



            </div>
        </div>
    );
}