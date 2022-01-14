import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { signInUrl } from '../helpers/url';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); //Previously useHistory in v5

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
                    navigate('/');
                }
                console.log("Reponse while logging in", data);
            })

        setEmail('');
        setPassword('');
    }

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
