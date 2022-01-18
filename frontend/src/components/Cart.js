import { Button } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { CartItem } from './index';

export default function Cart() {
    const userName = useSelector(state => state.user.user.fullName);
    const cartItems = useSelector(state => state.cart.items);
    const cartTotal = useSelector(state => state.cart.cartTotal);
    const cartQuantity = useSelector(state => state.cart.cartQuantity);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    return (
        <div className='cart'>
            <h1>Welcome to cart, {userName}</h1>
            {cartItems.map((item) => {
                return <CartItem key={item._id} id={item._id} name={item.name} price={item.price} imgUrl={item.imgUrl} inStock={item.inStock} quantity={item.quantity} />
            })}
            <div className="cart-summary">
                <h2 style={{ margin: "5px" }}>Total: ${cartTotal}</h2>
                <Link to={isLoggedIn ? '/checkout' : '/users/signin'} style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Proceed to checkout ({cartQuantity} items in cart)
                    </Button>
                </Link>
            </div>
        </div>
    )
}
