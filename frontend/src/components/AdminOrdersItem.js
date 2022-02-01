import React, { useEffect, useState } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import moment from 'moment';
import { InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { getOrders } from '../helpers/url';

export default function AdminOrdersItem({ item }) {

    const [selected, setSelected] = useState(item.status);

    const handleChange = (e) => {
        //api call 
        // update the order state according to the response
        fetch(`${getOrders}/${item._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ status: e.target.value })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setSelected(data.status);
                }
            })

    }

    return <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
            {item._id}
        </TableCell>
        <TableCell align="right">{item.amount}</TableCell>
        <TableCell align="right">{item.quantity}</TableCell>
        <TableCell align="right">{moment(item.createdAt).format("MMM Do YY")}</TableCell>
        <TableCell align="right">{item.status}</TableCell>
        <TableCell>{item.userId}</TableCell>
        <TableCell>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="status"
                onChange={handleChange}
            >
                <MenuItem value="placed">Placed</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
        </TableCell>
        <TableCell>
            <Link to={`/orders/${item._id}`}>
                <Tooltip title="View order details">
                    <ArrowCircleRightIcon style={{ fontSize: "30px", border: "none" }} />
                </Tooltip>
            </Link>
        </TableCell>
    </TableRow>;
}
