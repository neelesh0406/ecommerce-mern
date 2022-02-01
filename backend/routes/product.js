const router = require('express').Router();
const Product = require('../models/Products');
const verifyJWT = require('../middleware/auth');


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
        inStock: req.body.inStock,
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

// @route - put /api/product/:id
// @desc  - Update single product
// @access- PROTECTED - ADMIN
router.put('/:id', verifyJWT, async (req, res) => {

    if (req.user.isAdmin) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedProduct);
        } catch (err) {
            res.json(err);
        }
    } else {
        res.status(500).json({ message: "Not authorised" });
    }

})


// @route - DELETE /api/product/:id
// @desc  - Delete single product
// @access- PROTECTED - ADMIN
router.delete('/:id', verifyJWT, async (req, res) => {

    if (req.user.isAdmin) {
        try {
            const deleteResponse = await Product.findByIdAndDelete(req.params.id)
            res.status(200).json(deleteResponse);
        } catch (err) {
            res.json(err);
        }
    } else {
        res.status(500).json({ message: "Not authorised" });
    }

})


module.exports = router;