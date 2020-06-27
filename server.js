const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// BodyparserMiddleware
app.use(bodyParser.json());

