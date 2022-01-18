const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        default: false
    },
    address: {
        type: Object,
        default: {}
    }
}, { timestamps: true }
)

const User = mongoose.model('User', userSchema);
module.exports = User;