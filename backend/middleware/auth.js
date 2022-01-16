const jwt = require('jsonwebtoken');
const JWTSecret = require('../config/secretKey');

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"].split(' ')[1];

    if (token) {
        jwt.verify(token, JWTSecret, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to authenticate"
            })
            req.user = decoded; // set the req.user to payload of token 
            next();
        })
    } else {
        res.json({ message: "No token given", isLoggedIn: false })
    }
}

module.exports = verifyJWT;