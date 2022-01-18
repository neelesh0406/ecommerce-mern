import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { DECREASE_CART_QUANTITY, INCREASE_CART_QUANTITY, REMOVE_FROM_CART } from '../action';

export default function CartItem({ id, name, price, inStock, imgUrl, quantity }) {

    const dispatch = useDispatch();

    const handleRemove = (id) => {
        //dispatch the action with item id
        dispatch({ type: REMOVE_FROM_CART, value: id });
    }
    const handelIncrease = (id) => {
        // quantity <= in stock
        if (quantity < inStock) dispatch({ type: INCREASE_CART_QUANTITY, value: id });
    }

    const handelDecrease = (id) => {
        //if quantity <= 1 disable
        if (quantity > 1) dispatch({ type: DECREASE_CART_QUANTITY, value: id });
    }

    return (
        <div className="cart-container">
            <div className="cart-left">
                <span onClick={() => handleRemove(id)}>
                    <CloseIcon style={{ cursor: "pointer" }} />
                </span>
                <img src={imgUrl} className='cart-left-img' />
            </div>
            <div className="cart-right">
                <h2>{name}</h2>
                <p>${price}</p>
                <p>In stock: {inStock}</p>
            </div>
            <div className="cart-btn">
                <button disabled={quantity <= 1} onClick={() => handelDecrease(id)}><RemoveCircleIcon style={{ cursor: "pointer", fontSize: "25px" }} /></button>
                <span>{quantity}</span>
                <button disabled={quantity >= inStock} onClick={() => handelIncrease(id)}><AddCircleIcon style={{ cursor: "pointer", fontSize: "25px" }} /></button>
            </div>
        </div>
    )
}
