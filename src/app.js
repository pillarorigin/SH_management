const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

app = express();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(routes);

module.exports = app;