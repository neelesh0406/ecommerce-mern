import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { getOrders } from '../helpers/url';


export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(getOrders, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem('token')
            },
        })
            .then(response => response.json())
            .then(data => setOrders(data));

    }, [])

    return (
        <div className="orders">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Id</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Order date</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((item) => (
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
        </div>
    )
}
