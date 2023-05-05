import React, {useState, useEffect} from 'react';

export default function General() {
    const [auth] = useState(JSON.parse(window.localStorage.getItem('auth')));
    const [data, setData] = useState([])

    useEffect(() => {
        if(auth === null){
            window.history.pushState({}, undefined, "/login")
            window.location.reload()
        }else{
            getGameStates()
        }
    }, [])

    const getGameStates = () => {
        fetch(process.env.REACT_APP_APIURL + '/access/getGameState', {
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

    const createNewState = (name) => {
        fetch(process.env.REACT_APP_APIURL + '/access/newState', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
            body: JSON.stringify({stateName: name})
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                window.history.pushState({}, undefined, "/login")
                window.location.reload()
            }
            else{
                getGameStates()
            }
        })
    }
    const changeState = (e, id, state) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + '/access/modifyState/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
            body: JSON.stringify({state: state})
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                window.history.pushState({}, undefined, "/login")
                window.location.reload()
            }
            else{
                getGameStates()
            }
        })
    }


    return (
        <div className="General">
            {data.map((el, index) => {
                return(
                <div key={index} className='header-key'>
                    <div>
                        <p>{el.stateName.charAt(0).toUpperCase()+el.stateName.slice(1)} current state :
                            <span style={el.state === 1 ? {color: '#AA4A44'} : (el.state === 2 ? {color: '#ff7f00'} : {color: '#1fa055'})}>{el.state === 1 ? ' Close' : (el.state === 2 ? ' Private' : ' Public')}</span>
                        </p>
                    </div>
                    <div className='button-group'>
                        <button className='button-b' onClick={(e) => changeState(e, el._id, 1)} >Close</button>
                        <button className='button-b' onClick={(e) => changeState(e, el._id, 2)} >Private</button>
                        <button className='button-b' onClick={(e) => changeState(e, el._id, 3)} >Public</button>
                    </div>
                </div>
                )
            })}
        </div>
    );
}