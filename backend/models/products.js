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
    inStock: {
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
    },
    isPublished: {  // For the checkbox on Product screen for admin
        type: Boolean,
        default: true
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;