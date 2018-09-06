const express = require('express');

const router = express.Router();

router.delete('/', (req, res) => {
    res.setEncoding('hello');
});

module.exports = router;