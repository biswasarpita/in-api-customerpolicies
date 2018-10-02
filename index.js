const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const routes = require('./src/Routes');
const configuration = require('./src/configuration');

const app = express();
app.server = http.createServer();

//
// Middleware
//
app.use(
  bodyParser.json({
    limit: configuration.bodyLimit
  })
);
//
//  API routes V1
//
app.use('/', routes);

const server = app.listen(process.env.PORT || configuration.serverPort, () => {
  console.log(`Server listening at PORT ${process.env.PORT || configuration.serverPort}`); // eslint-disable-line
});

module.exports = server;
