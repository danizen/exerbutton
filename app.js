'use strict';

const express      = require('express');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const app          = express();


app.use(cors())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hello, world (with ordered auto deploy and unit tests)!'
  });
});

app.get('*', (req, res) => {
  res.status(200).json({
    success: false,
    message: 'Endpoint not found'
  });
});

module.exports = app;
