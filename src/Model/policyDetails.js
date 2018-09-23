const mongoose = require('mongoose');

const policy = new mongoose.Schema({
  policyNumber: {
    type: Number,
    required: true,
    trim: true
  },
  planName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  policyTerm: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  policyCoverage: [{
    coverageId: {
      type: Number
    }
  }
  ],
  instalmentPremium: {
    type: Number
  },
  instalmentDate: {
    type: Date
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'Cheque', 'Online']
  },
  dateOfMaturity: {
    type: Date,
  },
  sumAssured: {
    type: Number
  },
  createdBy: {
    type: String,
    lowercase: true,
    trim: true
  },
  updatedBy: {
    type: String,
    lowercase: true,
    trim: true
  },
},
{
  toObject: {
    virtuals: true
  },
  timestamps: true,
});

policy.virtual('policyId').get(function getMongoID() {
  return this._id; // eslint-disable-line
});

module.exports = mongoose.model('policyDetails', policy);
