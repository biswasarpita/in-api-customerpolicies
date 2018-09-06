const express = require('express');

const router = express.Router();

//
// Controllers
//
const customerPolicyControl = require('../Controller/customerPolicyControl');

//
// Destination routes
//

//
// GET
//
router.get('/mdmid/:mdmid', customerPolicyControl.get_customerdetails_by_mdmid);

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