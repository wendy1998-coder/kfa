const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const events = require('./events');

const app = express();
const apiRoute = "/.netlify/functions/events";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(apiRoute, events())


module.exports = app;
module.exports.handler = serverless(app);