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

//
// POST
//

//
// PUT
//

//
// DELETE
//

module.exports = router;
