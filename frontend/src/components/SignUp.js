import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleAddUser = (e) => {
        e.preventDefault();

        const newUser = {
            email,
            password,
            fullName,
            isAdmin
        }

        const url = '/api/users';
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => console.log("REsponse on front user: ", data))
    }

    return (
        <div className='add-product-form'>
            <form onSubmit={e => handleAddUser(e)}>
                <div>
                    <TextField value={fullName} onChange={e => setFullName(e.target.value)} label="Name" variant="outlined" type="text" required />
                    <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email" variant="outlined" type='email' required />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} label="Password" variant="outlined" type='password' required />
                    <TextField value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} label="Confirm password" variant="outlined" type='password' required />
                    <FormControl style={{ marginTop: "10px" }}>
                        <InputLabel id="demo-simple-select-label">Admin</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={isAdmin}
                            label="Admin"
                            onChange={e => setIsAdmin(e.target.value)}
                        >
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Button type='submit' variant="contained" style={{ display: "block", margin: "auto" }}>Register</Button>
            </form>
        </div>
    )
}
