const express = require('express');
const customer = require('./customer');
const auth = require('./auth');

const router = express.Router();

router.use('/v1/api/customer', customer);
router.use('/v1/api/auth', auth);
//console.log('I am in Routes/inder.js');

router.get('/', (req, res) => {
    res.send('hello');
});

module.exports = router;