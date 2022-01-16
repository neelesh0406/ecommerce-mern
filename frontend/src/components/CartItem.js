import React from 'react'

export default function CartItem({ name, price, inStock, imgUrl }) {
    return (
        <div className="cart-container">
            <div className="cart-left">
                <img src={imgUrl} alt="" />
            </div>
            <div className="cart-right">
                <h2>{name}</h2>
                <p>{price}</p>
                <p>In stock: {inStock}</p>
            </div>
            <button>X</button>
        </div>
    )
}
