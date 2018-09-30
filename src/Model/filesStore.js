const mongoose = require('mongoose');

const store = new mongoose.Schema({
  fileType: {
    type: String
  },
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  fileBase64: {
    type: String,
    required: true
  },
  fileIdent: {
    type: String,
    required: true,
    lowercase: true
  }
}, {
  toObject: {
    virtuals: true
  },
  timestamps: true,
});

store.virtual('fileId').get(function getMongoId() {
  return this._id; // eslint-disable-line
});

module.exports = mongoose.model('filesStore', store);
