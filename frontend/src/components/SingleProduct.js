import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { singleProductUrl } from '../helpers/url';


export default function SingleProduct() {
    const [singleProduct, setSingleProduct] = useState({});
    const id = useParams().id;

    useEffect(() => {
        const url = `${singleProductUrl}/${id}`
        const getSingleProduct = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setSingleProduct(data);
        }
        getSingleProduct();
    }, [])

    const { name, description, quantity, category, imgUrl } = singleProduct;

    return <>
        <div className="single-product-top">
            <img src={imgUrl} />
        </div>
        <div className="single-product-bottom">
            <h2>{name}</h2>
            <span>{description}</span>
            <span>In stock: {quantity}</span>
            <span>Category: {category}</span>
        </div>
    </>
}
