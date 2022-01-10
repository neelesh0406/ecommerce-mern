const express = require('express');
const app = express();
const port = 3000;
const products = require('./models/products');
const connectDB = require('./config/db'); //Mongo config

connectDB();

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.listen(port, () => {
    console.log("example app...");
})