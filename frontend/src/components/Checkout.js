import React, { useState } from 'react'
import { TextField, FormControl, InputLabel, Select, Button, MenuItem } from '@mui/material'
import { checkoutUrl } from '../helpers/url';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CART } from '../action/index';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handleCheckout = (e) => {
        e.preventDefault();

        fetch(checkoutUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                ...cart, address: {
                    fullAddress: address,
                    pincode,
                    phone,
                },
                paymentMethod
            })
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: CLEAR_CART })
                navigate('/orders');
                //clear cart //redirect user to order display page
            });


        setAddress('');
        setPincode('');
        setPhone('');
        setPaymentMethod('');
    }

    return (
        <div className='add-product-form'>
            <h1>Checkout : Enter details</h1>
            <form onSubmit={e => handleCheckout(e)}>
                <div>
                    <TextField value={address} onChange={e => setAddress(e.target.value)} label="address" variant="outlined" type="text" />
                    <TextField value={pincode} onChange={e => setPincode(e.target.value)} label="pincode" variant="outlined" type="number" />
                    <TextField value={phone} onChange={e => setPhone(e.target.value)} label="phone" variant="outlined" type="number" />

                    <FormControl style={{ marginTop: "10px" }}>
                        <InputLabel id="demo-simple-select-label">Payment mode</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={paymentMethod}
                            label="Payment method"
                            onChange={e => setPaymentMethod(e.target.value)}
                        >
                            <MenuItem value="cod">COD</MenuItem>
                            <MenuItem value="card">Card</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Button type='submit' variant="contained" style={{ display: "block", margin: "10px auto" }}>Place order</Button>
            </form>
        </div>
    )
}
