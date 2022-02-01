const router = require('express').Router();
const User = require('../models/Users');
const crypto = require('crypto-js'); //For hashing password
const cryptoJsSecretKey = require('../config/secretKey');
const JWTSecret = require('../config/secretKey');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../middleware/auth');

// @route - POST /api/users/signup
// @desc  - Register User
// @access- PUBLIC
router.post('/signup', async (req, res) => {
    const registeringUser = {
        email: req.body.email,
        password: crypto.AES
            .encrypt(req.body.password, cryptoJsSecretKey)
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
        const addedUser = await newUser.save();
        const payload = {
            id: addedUser._id,
            email: addedUser.email,
            name: addedUser.fullName,
            isAdmin: addedUser.isAdmin
        }
        //This payload will be sent inside the token to the front end
        jwt.sign(
            payload,
            JWTSecret,
            { expiresIn: 86400 },
            (err, token) => {
                if (err) return res.json({ message: "err in token" })
                return res.json({
                    message: "success",
                    token: "Bearer " + token
                })
            }
        )
    }
})

// @route - POST /api/users/signin
// @desc  - Login User
// @access- PUBLIC
router.post('/signin', async (req, res) => {

    const dbUser = await User.findOne({ "email": req.body.email }); //search for the user in db

    // If user exist
    if (dbUser) {
        const logInUserPassword = req.body.password;
        //compare passwords
        const decodedPassword = crypto.AES.decrypt(dbUser.password, cryptoJsSecretKey).toString(crypto.enc.Utf8);
        if (logInUserPassword === decodedPassword) {
            //jwt token
            const payload = {
                id: dbUser._id,
                email: dbUser.email,
                name: dbUser.fullName,
                isAdmin: dbUser.isAdmin
            }
            //This payload will be sent inside the token to the front end
            jwt.sign(
                payload,
                JWTSecret,
                { expiresIn: 86400 },
                (err, token) => {
                    if (err) return res.json({ message: "err in token" })
                    return res.json({
                        message: "success",
                        token: "Bearer " + token
                    })
                }
            )
        } else {
            res.status(404);
            res.json({ message: "Invalid Username or password" });
        }

    } else {
        // If user doesn't exist
        res.status(404);
        res.json({ message: "Invalid User" });
    }

})

// @route - GET /api/users/profile
// @desc  - User Profile
// @access- PROTECTED
router.get('/profile', verifyJWT, async (req, res) => {
    res.json({ isLoggedIn: true, email: req.user.email, isAdmin: req.user.isAdmin });
})

// router.put('/:id', async (req, res) => {
//     // const id = req.params.id;
//     try {
//         const updateUser = await User.updateMany({
//             $set: {
//                 address: {
//                     fullAddress: "Test address"
//                 }
//             }
//         }, {
//             new: true
//         });
//         res.status(200).json(updateUser);

//     } catch (err) {
//         console.log(err);
//     }
// })


module.exports = router;