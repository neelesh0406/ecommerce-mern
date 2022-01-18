const verifyJWT = require('../middleware/auth');
const Order = require('../models/Orders');
const router = require('express').Router();

// @route - GET /api/orders/
// @desc  - Get Orders for the signed in user
// @access- PROTECTED
router.get('/', verifyJWT, async (req, res) => {
    const userId = req.user.id;
    //consumer 
    //query, orders m jiska userid 
    const matchingOrders = await Order.find({ "userId": userId }).sort({ createdAt: -1 });
    res.status(200).json(matchingOrders);
})

// @route - GET /api/orders/:id
// @desc  - get single order
// @access- PROTECTED
router.get('/:id', verifyJWT, async (req, res) => {
    const orderId = req.params.id;

    const singleOrder = await Order.findById(orderId);
    res.status(200).json(singleOrder);
})

// @route - POST /api/orders/checkout
// @desc  - Place order
// @access- PROTECTED
router.post('/checkout', verifyJWT, async (req, res) => {
    const userId = req.user.id;
    const obj = {
        userId,
        products: req.body.items,
        address: req.body.address,
        amount: req.body.cartTotal,
        quantity: req.body.cartQuantity,
        paymentMethod: req.body.paymentMethod
    }

    const newOrder = new Order(obj);
    const response = await newOrder.save();
    res.status(200).json(response);
})

module.exports = router;