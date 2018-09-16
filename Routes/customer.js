const express = require('express');
const jwtOperatons = require('../Middleware/jwtOperataions');
const router = express.Router();

//
// Controllers
//
const customerPolicyControl = require('../Controller/customerPolicyControl');

//
// Middlewares
//
router.use(jwtOperatons.jwtVerify);


//
// GET
//
router.get('/mdmid/:mdmid?', customerPolicyControl.get_customerdetails_by_mdmid);
router.get('/policyNumber/:policyNumber', customerPolicyControl.get_policy_detail_by_policyNumber);
router.get('/creationDate/:creationDate', customerPolicyControl.get_policy_detail_by_creationDate);
//router.get('/verify/token',jwtOperatons.jwtVerify);
//router.get('/auth/tokenData', jwtOperatons.jwtDecode);

//
// POST
//
router.post('/', customerPolicyControl.post_customer_details);
router.post('/policy/', customerPolicyControl.post_policy_details);

//
// PUT
//
//router.put('/mdmid/:mdmid', customerPolicyControl.put_details);

//
// DELETE
//
//router.delete('/mdmid/:mdmid', destinationController.delete_details);

module.exports = router;