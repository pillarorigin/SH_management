const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mysql = require('mysql');
app = express();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.use(routes);

module.exports = app;