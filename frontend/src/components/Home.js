import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, USER_AUTHENTICATE } from '../action';

export default function Home({ products }) {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const { email, name, isAdmin } = jwtDecode(token);

            dispatch({ type: USER_AUTHENTICATE, value: { email, fullName: name, isAdmin } })
        }

    }, [])

    const handleAddToCart = (item) => {
        dispatch({ type: ADD_TO_CART, value: item });
    }

    return <div className="products-catalog">
        {products.map((item) => {
            return <div className="product" key={item._id}>
                <Link to={`/products/${item._id}`}>
                    <div className="product-top">
                        <img src={item.imgUrl} />
                    </div>
                    <div className="product-bottom">
                        <h2>{item.name}</h2>
                        <span>{item.description}</span>
                        <span>In stock: {item.inStock}</span>
                        <span>Category: {item.category}</span>
                    </div>
                </Link>
                <Button onClick={() => handleAddToCart(item)} variant="contained" size="small" startIcon={<AddShoppingCartIcon />} style={{ width: "150px", margin: "3px auto" }}>Add to cart</Button>
                <Button variant="contained" size="small" startIcon={<LocalMallIcon />} style={{ width: "150px", margin: "3px auto" }}>Buy now</Button>
            </div>
        })}
    </div>
}
