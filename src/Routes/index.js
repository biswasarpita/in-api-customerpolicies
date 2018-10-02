const express = require('express');
const customer = require('./customer');
const auth = require('./auth');
const customerPolicyControl = require('../Controller/customerPolicyControl');

const router = express.Router();

router.use('/v1/api/customer', customer);
router.use('/v1/api/auth', auth);
//
// GET
//
router.get('/v1/api/upload/file', customerPolicyControl.post_file_to_db);
router.get('/v1/api/get/file/:fileIdent?', customerPolicyControl.get_file_from_db);

router.get('/', (req, res) => {
  res.send('hello');
});

//
// POST
//
router.post('/v1/api/policy', customerPolicyControl.post_policy_details);
router.post('/v1/api/coverage', customerPolicyControl.post_coverage_details);
router.post('/v1/api/cust', customerPolicyControl.post_customer_details);

router.post('/v1/api/upload/file', customerPolicyControl.post_file_to_db);

module.exports = router;
