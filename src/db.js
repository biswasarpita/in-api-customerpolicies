const mongoose = require('mongoose');
const configuration = require('./configuration');

// Mongo DB connection
mongoose.Promise = global.Promise;
mongoose.connect(configuration.dbUrl, { useNewUrlParser: true });
mongoose.set('debug', false);
mongoose.connection
  .once('open', () => {
    console.log('DB connection success'); // eslint-disable-line
  })
  .on('error', (err) => {
    console.log(`Error occured ${err}`); // eslint-disable-line
  });
module.exports = mongoose;
