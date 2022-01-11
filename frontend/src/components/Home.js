import React from 'react'
import { Link } from 'react-router-dom'

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
            </div>
        })}
    </div>
}
