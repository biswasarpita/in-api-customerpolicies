const initDB = require('../db'); // eslint-disable-line no-unused-vars
const CustomerDetails = require('../Model/customerDetails');
const PolicyDetails = require('../Model/policyDetails');
const CoverageDetails = require('../Model/coverageDetails');

module.exports.get_customerdetails_by_mdmid = async (req, res) => {
  try {
    /* Fetch customer by mdmId */
    const customerDetails = await CustomerDetails.findOne({
      mdmid: res.locals.mdmId
    });
    /* Create a new policies obj based upon policy numbers recieved from customer object */
    const policies = customerDetails.policyNumber.map(async (element) => {
      /* Get policy object from policy collection by its policy number */
      const policyObj = await PolicyDetails.findOne({
        policyNumber: element.policyId
      });
      /* Get all the coverage IDs in each policy object */
      const coverageIds = await policyObj.policyCoverage.map(
        coverage => coverage.coverageId
      );
      /* Get all the coverage objects from coverage collection */
      const coverages = coverageIds.map(async coverageId => CoverageDetails.findOne({ covID: coverageId }));
      /* Copying policy object as a new object */
      const policyResult = { ...policyObj.toObject() };
      /* Add a new array to hold the coverage data */
      policyResult.coverages = await Promise.all(coverages);

      return policyResult;
    });
    /* Copy customer details object */
    const result = { ...customerDetails.toObject() };
    /* Add a new array to hold detaled policy details */
    result.policies = await Promise.all(policies);
    delete result.policyNumber;

    res.send({
      status: 'OK',
      parties: result
    });
  } catch (e) {
    res.status(400).send({
      status: 'Error',
      message: e.message
    });
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
        status: 'Error',
        message: e.message
      });
    });
};

module.exports.get_policy_detail_by_policyNumber = async (req, res) => {
  try {
    const result = await PolicyDetails.findOne({
      policyNumber: req.params.policyNumber
    });
    res.send({ status: 'OK', policies: result });
  } catch (e) {
    res.status(400).send({
      status: 'Error',
      message: e.message
    });
  }
};
module.exports.get_policy_detail_by_creationDate = async (req, res) => {
  let minDate = req.params.creationDate;
  minDate += 'T00:00:00.000Z';

  let maxDate = req.params.creationDate;
  maxDate += 'T23:59:59.999Z';

  try {
    const result = await PolicyDetails.find({
      createdAt: { $gte: new Date(minDate), $lte: new Date(maxDate) }
    });
    res.send({
      status: 'OK',
      policies: result
    });
  } catch (e) {
    res.status(400).send({
      status: 'Error',
      message: e.message
    });
  }
};
module.exports.post_customer_details = (req, res) => {
  const customerDetails = new CustomerDetails(req.body);
  customerDetails
    .save()
    .then((savedData) => {
      res.send({
        status: 'OK',
        outcome: savedData
      });
    })
    .catch((e) => {
      res.status(400).send({
        status: 'Error',
        message: e.message
      });
    });
};

module.exports.post_policy_details = (req, res) => {
  const policyDetails = new PolicyDetails(req.body);
  policyDetails
    .save()
    .then((savedData) => {
      res.send({
        status: 'OK',
        outcome: savedData
      });
    })
    .catch((e) => {
      res.status(400).send({
        status: 'Error',
        message: e.message
      });
    });
};

module.exports.post_coverage_details = (req, res) => {
  const coverageDetails = new CoverageDetails(req.body);
  coverageDetails
    .save()
    .then((savedData) => {
      res.send({
        status: 'OK',
        outcome: savedData
      });
    })
    .catch((e) => {
      res.status(400).send({
        status: 'Error',
        message: e.message
      });
    });
};
