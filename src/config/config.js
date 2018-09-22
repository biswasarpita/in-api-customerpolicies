const dotenv = require('dotenv');

module.exports = {
  jwtSecret: String(dotenv.config('JWT_SECRET')).toString()
};
