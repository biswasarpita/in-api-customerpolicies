const initDB = require('../db'); // eslint-disable-line no-unused-vars
const CustomerDetails = require('../Model/customerDetails');
const PolicyDetails = require('../Model/policyDetails');
const CoverageDetails = require('../Model/coverageDetails');

module.exports.get_customerdetails_by_mdmid = async (req, res) => {
  try {
    let coverages = [];
    const customerDetails = await CustomerDetails.findOne({ mdmid: res.locals.mdmId });
    const policies = customerDetails.policyNumber.map(async (element) => {
      const policyObj = await PolicyDetails.find({ policyNumber: element.policyId });
      const coverageDetails = policyObj.map(async (policy) => {
        const coverageIds = await policy.policyCoverage.map(coverage => coverage.coverageId);
        coverages = coverageIds.map(async (coverageId) => {
          await CoverageDetails.findOne({ covID: coverageId });
        });
        return coverages;
      });
      const policyResult = { ...policyObj };
      policyResult.coverages = await Promise.all(coverageDetails);
      return policyResult;
    });

    const result = { ...customerDetails.toObject() };
    result.policies = await Promise.all(policies);

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
    const result = await PolicyDetails.findOne({ policyNumber: req.params.policyNumber });
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
    const result = await PolicyDetails
      .find({ createdAt: { $gte: new Date(minDate), $lte: new Date(maxDate) } });
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
  customerDetails.save()
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
  policyDetails.save()
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
  coverageDetails.save()
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
