const mongoose = require('mongoose');

const coverage = new mongoose.Schema({
  covID: {
    type: Number,
    required: true,
  },
  covDesc: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  covAmount: {
    type: Number,
    required: true,
    trim: true
  }
}, {
  toObject: {
    virtuals: true
  }
});
coverage.virtual('coverageId').get(function getMongoId() {
  return this._id; // eslint-disable-line
});

module.exports = mongoose.model('coverageDetails', coverage);
