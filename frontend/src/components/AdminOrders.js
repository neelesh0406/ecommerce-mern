import React, { useEffect, useState } from 'react';
import { getOrders } from '../helpers/url';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import moment from 'moment';
import { Link, Navigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

export default function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

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
                        <TableCell align="right">User Id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.length && orders.map((item) => (
                        <TableRow
                            key={item._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item._id}
                            </TableCell>
                            <TableCell align="right">{item.amount}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{moment(item.createdAt).format("MMM Do YY")}</TableCell>
                            <TableCell align="right">0</TableCell>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell>
                                <Link to={`/orders/${item._id}`}>
                                    <Tooltip title="View order details">
                                        <ArrowCircleRightIcon style={{ fontSize: "30px", border: "none" }} />
                                    </Tooltip>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>;
}
