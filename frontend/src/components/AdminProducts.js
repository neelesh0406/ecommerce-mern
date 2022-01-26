import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { getProductsUrl, singleProductUrl } from '../helpers/url';
import { Tooltip } from '@mui/material';

export default function AdminProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(getProductsUrl)
            .then(response => response.json())
            .then(data => setProducts(data));

    }, []);

    const handleDeleteProduct = (productId) => {
        //send a DELETE request to the server on route /api/products/:id
        fetch(`${singleProductUrl}/${productId}`, {
            method: "DELETE",
            headers: {
                "x-access-token": localStorage.getItem('token')
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data._id === productId) {
                    //In case the product is deleted from the db and we receive the deleted product as response
                    //remove the product from our state (products)
                    const newProductsArr = products.filter(item => {
                        if (item._id === data._id) {
                            return false
                        }
                        return true;
                    })
                    setProducts(newProductsArr);
                }
                return;
            });
    }

    return <div className='admin-products'>
        <Link to='/admin/products/add' style={{ textDecoration: "none" }}>
            <Button variant='outlined' style={{ display: "block", width: "50%", margin: "50px auto", }}>+ ADD NEW PRODUCT</Button>
        </Link>

        <div className="products-catalog" style={{ width: "100%" }}>
            {products.length && products.map(item => {
                return <div className="product" key={item._id}>
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
                    <div className="product-bottom">$ {item.price}</div>
                    <Button>
                        <Link to={`/admin/products/edit/${item._id}`} style={{ color: "#1976d2" }}>
                            Edit Product
                        </Link>
                    </Button>
                    <Button>
                        <span onClick={() => handleDeleteProduct(item._id)}>
                            {/* <Link to={`/admin/products/delete/${item._id}`} style={{ color: "#1976d2" }}> */}
                            Delete Product
                            {/* </Link> */}
                        </span>
                    </Button>
                    <Tooltip title={`Can${item.isPublished ? ' ' : 'not '}be seen by the buyer. Change this by editing the product`}>
                        <p className='product-mid-text'>{item.isPublished ? 'PUBLISHED' : 'NOT PUBLISHED'}</p>
                    </Tooltip>
                </div>
            })}
        </div>
    </div>;
}
