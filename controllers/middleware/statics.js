var express = require('express');
var statics = new express();

statics.use(express.static(appRoot + sep + 'views'));
statics.use(express.static(appRoot + sep + 'controllers'));
statics.use(express.static(appRoot + sep + 'models'));
statics.use(express.static(appRoot + sep + 'resources' + sep + 'external-libraries'));
statics.use(express.static(appRoot + sep + 'resources' + sep + 'images'));

module.exports = statics;

console.log('Statics middleware set.');