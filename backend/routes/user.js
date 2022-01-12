const router = require('express').Router();
const User = require('../models/Users');
const crypto = require('crypto-js'); //For hashing password
const secretKey = require('../config/secretKey');

// @route - POST /api/users
// @desc  - Register User
// @access- PUBLIC
router.post('/', async (req, res) => {
    const registeringUser = {
        email: req.body.email,
        password: crypto.AES
            .encrypt(req.body.password, secretKey)
            .toString(),
        fullName: req.body.fullName,
        isAdmin: req.body.isAdmin
    }
    //check if the current email exists in database
    const dbUser = await User.findOne({ "email": req.body.email });

    if (dbUser) {
        res.status(400);
        res.json({ success: false, message: "Signup failed, user already exists" });
    } else {
        const newUser = new User(registeringUser);
        await newUser.save();
        res.status(201);
        res.json({ success: true, message: "Signup success" });
    }
})

module.exports = router;