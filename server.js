"use strict";

var express = require('express');
var app = express();

// Use port 8000
app.listen(8000);

// Use Public folder to store client-side files
app.use(express.static('node_modules'));
app.use(express.static('public'));