var express = require('express');
var app = express();

var path = require('path');
global.appRoot = path.resolve(__dirname);
console.log('appRoot is: ' + appRoot);

app.use(require('./controllers/middleware/statics')); // import all serve-statics
app.use(require('./controllers/middleware/routing'));

var bodyParser = require('body-parser'); // for parsing requests
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 3000;
app.listen(port);
console.log('app listening to port: ' + port);