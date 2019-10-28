const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

app = express();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.use(session({
  secret: 'testcat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
  cookie: {
    maxAge: 3000 * 60 * 60
  }
}))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(cors());
app.use(routes);

module.exports = app;