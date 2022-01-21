import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { signInUrl } from '../helpers/url';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { USER_AUTHENTICATE } from '../action';


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigate = useNavigate('');
    const dispatch = useDispatch();

    const handleLoginUser = (e) => {
        e.preventDefault();

        fetch(signInUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    // If details are correct and we receive a token
                    localStorage.setItem('token', data.token);

                    //dispatch the details to state
                    const { email, name, isAdmin } = jwtDecode(data.token);
                    dispatch({ type: USER_AUTHENTICATE, value: { email, fullName: name, isAdmin } })

                    // const isAdmin = jwtDecode(data.token).isAdmin;

                    if (isAdmin) {
                        console.log("Is admin block run   ");
                        navigate('/admin', { replace: true });
                        //redirect to '/admin' if isAdmin is true
                    } else {
                        console.log("Not is admin run   ");
                        //redirect to '/' while logging in IF NOT ADMIN
                        navigate('/');
                    }

                }
                console.log("Reponse while logging in", data);
            })

        setEmail('');
        setPassword('');
    }

    // if (isLoggedIn) {
    //     return <Navigate to='/' />
    // }

    return (
        <div className='add-product-form'>
            <h1>Sign in</h1>
            <form onSubmit={e => handleLoginUser(e)}>
                <div>
                    <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email" variant="outlined" type='email' required />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} label="Password" variant="outlined" type='password' required />
                </div>

                <Button type='submit' variant="contained" style={{ display: "block", margin: "20px auto" }}>Log in</Button>
            </form>
        </div>
    )
}
