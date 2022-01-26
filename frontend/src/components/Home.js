import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, USER_AUTHENTICATE } from '../action';
import { ProductItem } from './index';
import { getProductsUrl } from '../helpers/url';

export default function Home() {

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(getProductsUrl)
            .then(response => response.json())
            .then(data => setProducts(data));

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
            if (!item.isPublished) {
                return
            }
            return <ProductItem key={item._id} item={item} handleAddToCart={handleAddToCart} />
        })}
    </div>
}
