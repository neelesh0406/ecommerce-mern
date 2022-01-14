import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate(); //previously useHistory

    useEffect(() => {
        const url = '/api/users/profile';
        fetch(url, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => data.isLoggedIn ? navigate('/') : navigate('/users/signin'));

    }, [])
    return (
        <div className='user-profile'>
            <h1>Profile page</h1>
        </div>
    )
}
