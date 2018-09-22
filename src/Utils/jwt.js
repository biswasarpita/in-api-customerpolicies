const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.sign = data => jwt.sign(data, config.jwtSecret, { expiresIn: 60 * 60 });


module.exports.decode = token => jwt.decode(token);


module.exports.verify = token => jwt.verify(token, config.jwtSecret, (err, decoded) => {
  if (err) {
    throw new Error(err);
  } else {
    return decoded;
  }
});
