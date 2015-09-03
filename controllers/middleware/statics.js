var express = require('express');
var statics = new express();

statics.use(express.static(appRoot + '\\views'));
statics.use(express.static(appRoot + '\\resources\\external-libraries'));
statics.use(express.static(appRoot + '\\controllers'));
statics.use(express.static(appRoot + '\\resources\\images'));

module.exports = statics;