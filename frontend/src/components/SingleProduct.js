import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ADD_TO_CART } from '../action';
import { singleProductUrl } from '../helpers/url';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function SingleProduct() {
    const [singleProduct, setSingleProduct] = useState({});
    const id = useParams().id;
    const dispatch = useDispatch();

    useEffect(() => {
        const url = `${singleProductUrl}/${id}`
        const getSingleProduct = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setSingleProduct(data);
        }
        getSingleProduct();
    }, [])

    const handleAddToCart = (item) => {
        dispatch({ type: ADD_TO_CART, value: item });
    }

    const { name, description, inStock, category, imgUrl } = singleProduct;

    return <div className="single-product">
        <div className="single-product-left">
            <img src={imgUrl} />
        </div>
        <div className="single-product-right">
            <h2 style={{ fontSize: "40px" }}>{name}</h2>
            <p style={{ margin: "20px 0", fontSize: "25px" }}>{description}</p>
            <div className="product-mid-text" style={{ fontSize: "20px" }}>
                <span>In stock: {inStock}</span>
                <span>{category && category.toUpperCase()}</span>
            </div>
            <Button onClick={() => handleAddToCart(singleProduct)} variant="contained" size="large" startIcon={<AddShoppingCartIcon />} style={{ width: "100%", margin: "3px auto" }}>Add to cart</Button>
        </div>
    </div>
}
