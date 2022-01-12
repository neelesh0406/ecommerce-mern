import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';

export default function Home({ products }) {
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
                        <span>In stock: {item.quantity}</span>
                        <span>Category: {item.category}</span>
                    </div>
                </Link>
                <Button variant="contained" size="small" startIcon={<AddShoppingCartIcon />} style={{ width: "150px", margin: "3px auto" }}>Add to cart</Button>
                <Button variant="contained" size="small" startIcon={<LocalMallIcon />} style={{ width: "150px", margin: "3px auto" }}>Buy now</Button>
            </div>
        })}
    </div>
}
