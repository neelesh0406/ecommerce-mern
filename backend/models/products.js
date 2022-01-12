const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: "Default description.."
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "other"
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;