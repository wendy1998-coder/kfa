const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'user_goes_here',
  password : 'password_goes_here',
  database : 'database_goes_here'
});

connection.connect();

const app = express();
const apiRoute = "/.netlify/functions/server/api";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(events(connection))

const router = express.Router();

router.get("/api/test", (req, res) => {
  res
    .status(200)
    .json({message: 'Endpoint is working' });
});

app.use(apiRoute, router);

module.exports = app;
module.exports.handler = serverless(app);