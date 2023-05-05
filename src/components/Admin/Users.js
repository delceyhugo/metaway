import React, {useState, useEffect} from 'react';

export default function Users() {
    const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')));
    const [data, setData] = useState([])

    useEffect(() => {
        if(auth === null){
            window.history.pushState({}, undefined, "/login")
            window.location.reload()
        }else{
            getAllUsers()
        }
    }, [])


    const getAllUsers = () => {

        fetch(process.env.REACT_APP_APIURL + '/user/getAllUsers', {
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
        <div className="Users">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">Users</th>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Perm</th>
                            <th>Date</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((el, index) => {
                        return (
                        <tr key={index}>
                            <td>{el.username}</td>
                            <td>{el.email}</td>
                            <td>{el.perm}</td>
                            <td>{el.date}</td>
                            <td>{el._id}</td>

                        </tr>
                        )}
                    )}

                    </tbody>
                </table>



            </div>
        </div>
    );
}