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

// const products = [
//     {
//         id: 1,
//         name: "LV Shirt",
//         price: 1200,
//         quantity: 5
//     },
//     {
//         id: 2,
//         name: "Blye Shirt",
//         price: 100,
//         quantity: 50
//     },
// ]
// module.exports = products;
