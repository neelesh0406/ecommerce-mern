import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material';
import { singleProductUrl } from '../helpers/url';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddProduct() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [inStock, setinStock] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [category, setCategory] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    const productId = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${singleProductUrl}/${productId}`)
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setPrice(data.price);
                setDescription(data.description);
                setinStock(data.inStock);
                setImgUrl(data.imgUrl);
                setCategory(data.category);
                setIsPublished(data.isPublished);
            })

    }, [])

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const updatedProduct = {
            name,
            price,
            description,
            inStock,
            imgUrl,
            category,
            isPublished
        }

        //This PUT req goes to "http://localhost:3000/api/products/:id" on the backend to add it to Mongo db
        fetch(`${singleProductUrl}/${productId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => response.json())
            .then(data => navigate('/admin/products'))

    }

    const handleCheckbox = () => {
        setIsPublished(!isPublished);
    }

    const handleCancelEdit = () => {
        return navigate('/admin/products', { replace: true });
    }

    return (
        <div className='add-product-form'>
            <h1>Edit product details</h1>
            <form onSubmit={e => handleUpdateProduct(e)}>
                <div>
                    <TextField value={name} onChange={e => setName(e.target.value)} label="Name" variant="filled" type="text" required />
                    <TextField value={price} onChange={e => setPrice(e.target.value)} label="price" variant="filled" type="number" required />
                    <TextField value={description} onChange={e => setDescription(e.target.value)} label="description" variant="filled" type="text" required />
                    <TextField value={inStock} onChange={e => setinStock(e.target.value)} label="inStock" variant="filled" type="text" required />
                    <TextField value={imgUrl} onChange={e => setImgUrl(e.target.value)} label="imgUrl" variant="filled" type="text" required />
                    <TextField value={category} onChange={e => setCategory(e.target.value)} label="category" variant="filled" type="text" required />
                    <label htmlFor="edit-check" style={{ textAlign: "center", color: "#1976d2", cursor: "pointer", marginTop: "10px" }}>
                        Is Published&nbsp;
                        <input type="checkbox" name="isPublished" id="edit-check" value="isPublished" checked={isPublished} onChange={handleCheckbox} />
                    </label>
                </div>

                <Button type='submit' variant="contained" style={{ display: "block", width: "50%", margin: "auto", marginTop: "20px" }}>Submit</Button>
                <span onClick={handleCancelEdit}>
                    <Button type='submit' variant="outlined" style={{ display: "block", margin: "auto", marginTop: "5px" }}>X Cancel</Button>
                </span>
            </form>
        </div>
    )
}
