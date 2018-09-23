const express = require('express');
const customer = require('./customer');
const auth = require('./auth');
const customerPolicyControl = require('../Controller/customerPolicyControl');

const router = express.Router();

router.use('/v1/api/customer', customer);
router.use('/v1/api/auth', auth);

router.get('/', (req, res) => {
  res.send('hello');
});

router.post('/v1/api/policy', customerPolicyControl.post_policy_details);
router.post('/v1/api/coverage', customerPolicyControl.post_coverage_details);
router.post('/v1/api/cust', customerPolicyControl.post_customer_details);

module.exports = router;
