import React, { useEffect, useState } from 'react';
import { getOrders } from '../helpers/url';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdminOrdersItem } from './index';
import { USER_AUTHENTICATE } from '../action';
import jwtDecode from 'jwt-decode';


export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(useSelector(state => state.user.isLoggedIn));
    const dispatch = useDispatch();
    console.log("Rendering", isLoggedIn)

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         const token = localStorage.getItem('token');
    //         const { email, name, isAdmin } = jwtDecode(token);
    //         setIsLoggedIn(true);
    //         dispatch({ type: USER_AUTHENTICATE, value: { email, fullName: name, isAdmin } })
    //     }
    // }, [])

    useEffect(() => {
        if (isLoggedIn) {
            fetch(getOrders, {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem('token')
                },
            })
                .then(response => response.json())
                .then(data => setOrders(data));
        }
    }, [])


    if (!isLoggedIn) {
        console.log("On Admin Orders page, redirecting if not logged in.....");
        return <Navigate replace to="/users/signin" />   //Redirect
    }

    return <div className="orders">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Order date</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="center">User Id</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.length && orders.map((item) => (
                        <AdminOrdersItem item={item} key={item._id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>;
}
