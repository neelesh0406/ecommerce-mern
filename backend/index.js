const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./config/db'); //Mongo config
const products = require('./models/products');

app.use(express.json()); //middleware for parsing req.body
connectDB();

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use('/api/products', require('./routes/product'));

app.listen(port, () => {
    console.log("Node app running at port ", port);
})