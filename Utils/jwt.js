const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.sign = (data) => {
    return jwt.sign(data, config.jwtSecret, { expiresIn: 60 * 60 });
}

module.exports.decode = (token) => {
    return jwt.decode(token);
}

module.exports.verify = (token) => {
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            throw new Error(err);
            console.log(err);
        } else {
            return decoded;
        }
    });
}