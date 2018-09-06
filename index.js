const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const customerRoutes = require('./Routes/customer');
const configuration = require('./configuration');

const app = express();
app.server = http.createServer();

//
// Middleware
//
app.use(bodyParser.json({
    limit: configuration.bodyLimit
}));

//
//  API routes V1
//
app.use('/v1/api/customer', customerRoutes);

app.listen(configuration.serverPort, () => {
    console.log(`Server listening at PORT ${configuration.serverPort}`);
});