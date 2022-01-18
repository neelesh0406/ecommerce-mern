const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array
    },
    address: {
        type: Object,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
}, { timestamps: true },
)

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;