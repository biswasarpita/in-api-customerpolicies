const express = require('express');
const router = express.Router();
const jwtOperatons = require('../Middleware/jwtOperataions');


router.get('/token/:mdmId',  jwtOperatons.jwtSign);

module.exports = router;