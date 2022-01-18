const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./config/db'); //Mongo config

app.use(express.json()); //middleware for parsing req.body
connectDB();

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use('/api/products', require('./routes/product'));
app.use('/api/users', require('./routes/user'));
app.use('/api/orders', require('./routes/order'));

app.listen(port, () => {
    console.log("Node app running at port ", port);
})