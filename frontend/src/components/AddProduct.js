import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { addProductUrl } from '../helpers/url';

export default function AddProduct() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [inStock, setinStock] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [category, setCategory] = useState('');

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            price,
            description,
            inStock,
            imgUrl,
            category
        }

        //This POST req goes to "http://localhost:3000/api/products" on the backend to add it to Mongo db
        fetch(addProductUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())

        setName('');
        setPrice('');
        setDescription('');
        setinStock('');
        setImgUrl('');
        setCategory('');

    }

    return (
        <div className='add-product-form'>
            <h1>Add product details</h1>
            <form onSubmit={e => handleAddProduct(e)}>
                <div>
                    <TextField value={name} onChange={e => setName(e.target.value)} label="Name" variant="filled" type="text" required />
                    <TextField value={price} onChange={e => setPrice(e.target.value)} label="price" variant="filled" type="number" required />
                    <TextField value={description} onChange={e => setDescription(e.target.value)} label="description" variant="filled" type="text" required />
                    <TextField value={inStock} onChange={e => setinStock(e.target.value)} label="inStock" variant="filled" type="text" required />
                    <TextField value={imgUrl} onChange={e => setImgUrl(e.target.value)} label="imgUrl" variant="filled" type="text" required />
                    <TextField value={category} onChange={e => setCategory(e.target.value)} label="category" variant="filled" type="text" required />
                </div>

                <Button type='submit' variant="contained" style={{ display: "block", margin: "auto", marginTop: "20px" }}>Submit</Button>
            </form>
        </div>
    )
}
