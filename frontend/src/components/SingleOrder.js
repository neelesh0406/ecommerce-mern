import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrders } from '../helpers/url';
import moment from 'moment';
import { Button } from '@mui/material';

export default function SingleOrder() {

    const orderId = useParams().id;
    const [order, setOrder] = useState({});

    useEffect(() => {
        fetch(`${getOrders}/${orderId}`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem('token')
            },
        }
        )
            .then(response => response.json())
            .then(data => setOrder(data));
    }, []);

    const { products, amount, address, createdAt, paymentMethod, status } = order;
    return (
        <div className='single-order'>
            {order && <div className="single-order-summary">
                <h1>Order details</h1>
                <div className="summary-container">
                    <div className="summary-child">
                        <p className="summary-h2">Order id</p>
                        <p className='summary-text'>{orderId}</p>
                    </div>
                    <div className="summary-child">
                        <p className="summary-h2">Order date</p>
                        <p className='summary-text'>{moment(createdAt).format("MMM Do YY")}</p>
                    </div>
                    {address && <div className="summary-child">
                        <p className="summary-h2">Order address</p>
                        <p className='summary-text summary-address'>
                            <span>{address.fullAddress}</span>
                            <span>{address.pincode}</span>
                            <span>{address.phone}</span>
                        </p>
                    </div>}
                    <div className="summary-child">
                        <p className="summary-h2">Payment method</p>
                        <p className='summary-text'>{paymentMethod}</p>
                    </div>
                </div>
                <Button>Undelivered</Button>
                <hr />
                <div className="summary-total">
                    <div className="summary-total-left">
                        <p className="summary-h2">Subtotal </p>
                        <p className="summary-h2">Shipping </p>
                        <p className="summary-h2">Discount </p>
                    </div>
                    <div className="summary-total-right">
                        <p className='summary-text summary-text2'>${amount}</p>
                        <p className='summary-text summary-text2'>$10</p>
                        <p className='summary-text summary-text2'>-$10</p>
                    </div>
                </div>
                <hr />
                <div className="summary-total">
                    <p className="summary-h2">Grand total </p>
                    <p className='summary-text summary-text2'>${amount}</p>
                </div>
            </div>}
            <div className="cart" style={{ marginTop: "0px" }}>
                {products && products.map(item => {
                    return <div className='cart-container' key={item._id}>
                        <div className="cart-left">
                            <img src={item.imgUrl} className='cart-left-img' />
                        </div>
                        <div className="cart-right">
                            <h2>{item.name}</h2>
                            <p>${item.price} per piece</p>
                            <p>x {item.quantity}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
