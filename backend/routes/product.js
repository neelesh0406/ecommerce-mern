const router = require('express').Router();
const Product = require('../models/products');


// @route - GET /api/product/
// @desc  - get all products
// @access- PUBLIC
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
})

// @route - POST /api/product/
// @desc  - add product
// @access- PUBLIC
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

// @route - get /api/product/:id
// @desc  - get single product
// @access- PUBLIC
router.get('/:id', async (req, res) => {
    const singleProduct = await Product.findById(req.params.id);
    res.json(singleProduct);
})

module.exports = router;