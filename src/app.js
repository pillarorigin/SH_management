const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app = express();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(cors());
app.use(routes);

module.exports = app;