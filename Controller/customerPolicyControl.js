const initDB = require('../db'); // eslint-disable-line no-unused-vars
const CustomerDetails = require('../Model/customerDetails');
const PolicyDetails = require('../Model/policyDetails');

module.exports.get_customerdetails_by_mdmid = async (req, res) => {
    //console.log(res.locals.mdmid, req.params.mdmid);
    try {
        const customerDetails = await CustomerDetails.findOne({ mdmid: res.locals.mdmId });
        //console.log(customerDetails);
        let policies = customerDetails.policyNumber.map(async (element, index) => {
            const policyObj = await PolicyDetails.find({ policyNumber: element.policyId });
            customerDetails.policyNumber[index] = policyObj[0];
            return policyObj[0];
        });
        await Promise.all(policies);

        res.send({
            status: 'OK',
            parties: customerDetails
        });
     } catch (e) {
        res.status(400).send({
            status: 'Error',
            message: e.message
        })
    }
};

module.exports.get_customerdetails_by_id = (req, res) => {
    CustomerDetails.findById(req.params.customerId)
        .then((customerDetails) => {
            res.send({
                status: 'OK',
                outcome: customerDetails
            });
        })
        .catch((e) => {
            res.status(400).send({
                status: 'ERROR',
                outcome: e
            });
        });
};

module.exports.post_customer_details = (req, res) => {
    const customerDetails = new CustomerDetails(req.body);
    customerDetails.save()
        .then((savedData) => {
            res.send({
                status: 'OK',
                outcome: savedData
            });
        })
        .catch((e) => {
            res.status(400).send({
                status: 'ERROR',
                outcome: e
            });
        });
};

module.exports.post_policy_details = (req, res) => {
    const policyDetails = new policyDetails(req.body);
    policyDetails.save()
        .then((savedData) => {
            res.send({
                status: 'OK',
                outcome: savedData
            });
        })
        .catch((e) => {
            res.status(400).send({
                status: 'ERROR',
                outcome: e
            });
        });
};
