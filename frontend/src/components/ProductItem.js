import React from 'react';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductItem({ item, handleAddToCart }) {
    return <div className="product">
        <Link to={`/products/${item._id}`}>
            <div className="product-top">
                <img src={item.imgUrl} />
            </div>
            <div className="product-mid">
                <h2>{item.name}</h2>
                <span>{item.description}</span>
                <div className="product-mid-text">
                    <span>In stock: {item.inStock}</span>
                    <span>{item.category.toUpperCase()}</span>
                </div>
            </div>
            <div className='product-bottom'>$ {item.price}</div>
        </Link >
        <Button onClick={() => handleAddToCart(item)} variant="contained" size="small" startIcon={<AddShoppingCartIcon />} style={{ width: "150px", margin: "3px auto" }}>Add to cart</Button>
    </div >;
}
