const initDB = require('../db'); // eslint-disable-line no-unused-vars
const CustomerDetails = require('../Model/customerDetails');
const policyDetails = require('../Model/policyDetails');


module.exports.get_customerdetails_by_mdmid = (req, res) => {
    customerDetails.findById(req.params.mdmid)
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
