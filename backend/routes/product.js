const router = require('express').Router();
const Product = require('../models/products');



router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
})

router.post('/', async (req, res) => {
    const obj = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        imgUrl: req.body.imgUrl,
        category: req.body.category
    }
    const newProduct = new Product(obj);
    const response = await newProduct.save();
    res.json(response);
})

module.exports = router;