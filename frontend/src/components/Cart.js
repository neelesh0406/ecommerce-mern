import React from 'react'
import { useSelector } from 'react-redux'
import { CartItem } from './index';

export default function Cart() {
    const userName = useSelector(state => state.user.user.fullName);
    const cartItems = useSelector(state => state.cart.items);
    console.log("Cart items : ", cartItems);
    const cartTotal = useSelector(state => state.cart.cartTotal);
    const cartQuantity = useSelector(state => state.cart.cartQuantity);

    return (
        <div className='cart'>
            <h1>Welcome to cart, {userName}</h1>
            {cartItems.map((item, index) => {
                return <CartItem key={index} name={item.name} price={item.price} imgUrl={item.imgUrl} inStock={item.quantity} />
            })}
            <div className="cart-summary">
                <p>Total: {cartTotal}</p>
                <p>No. of Items: {cartQuantity}</p>
            </div>
        </div>
    )
}
