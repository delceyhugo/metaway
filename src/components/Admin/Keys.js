import React, {useState, useEffect} from 'react';

export default function Keys() {
    const [auth] = useState(JSON.parse(window.localStorage.getItem('auth')));
    const [data, setData] = useState([])
    const [key, setKey] = useState('')

    useEffect(() => {
        if(auth === null){
            window.history.pushState({}, undefined, "/login")
            window.location.reload()
        }else{
            getAllKeys()
        }
    }, [])

    const getAllKeys = () => {
        fetch(process.env.REACT_APP_APIURL + '/key/getAllKeys', {
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
                setData(data.sort((a, b) => a.state - b.state))
            }
        })
    }
    const generateKey = (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + '/key/generateKey', {
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
                setKey(data.key)
                getAllKeys()
            }
        })
    }
    const deleteAllKeys = (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + '/key/deleteAll', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                window.history.pushState({}, undefined, "/login")
                window.location.reload()
            }
            else{
                getAllKeys()
                setKey('')
            }
        })
    }

    const deleteKey = (e, key) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + '/key/delete/' + key, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                window.history.pushState({}, undefined, "/login")
                window.location.reload()
            }
            else{
                setData([])
                getAllKeys()
            }
        })
    }

    const changeState = (e, key) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + '/key/changeState/' + key, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                window.history.pushState({}, undefined, "/login")
                window.location.reload()
            }
            else{
                setData([])
                getAllKeys()
            }
        })
    }



    return (
        <div className="Keys">
            <div className='header-key'>
                <button className='button-b' onClick={(e) => generateKey(e)}>Generate Key</button>
                <div>
                    <p>Key : {key}</p>
                </div>
                <button className='button-b' onClick={(e) => deleteAllKeys(e)}>Delete All Keys</button>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">Keys</th>
                        </tr>
                        <tr>
                            <th>Give</th>
                            <th>Key</th>
                            <th>Date</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((el, index) => {
                        return (
                        <tr key={index}>
                            <td>
                                {el.state ? <input onChange={(e) => changeState(e, el.key)} type="checkbox" checked /> : <input onChange={(e) => changeState(e, el.key)} type="checkbox" />}
                            </td>
                            <td>{el.key}</td>
                            <td>{el.date}</td>
                            <td>
                                <button onClick={(e) => deleteKey(e, el.key)} style={{'padding': '0px', 'width': '35px', 'height': '35px' }} className='button-c'>
                                    <img style={{'verticalAlign': 'middle'}} src="https://img.icons8.com/dotty/20/9BA9B4/delete-sign.png"/>
                                </button>
                            </td>
                        </tr>
                        )}
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}