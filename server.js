var express = require('express');
var app = express();

setup();
function setup() {
	setupGlobals();

	function setupGlobals(callback) {
		console.log('Setting up global variables...');
		var path = require('path');
		global.appRoot = path.resolve(__dirname);
		global.sep = path.sep;
		console.log('appRoot is: ' + appRoot);
		console.log('Finished setting up global variables.');
		setupDB();
	}

	function setupDB(callback) {
		console.log('Setting up DB...');
		global.mongoose = require('mongoose');
		mongoose.connect('mongodb://localhost/changeit');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'))
		db.once('open', function(callback) {
			console.log('Finished setting up DB.');
			setupMiddleware();
		});
	}

	function setupMiddleware(callback) {
		console.log('Setting up middleware...');
		app.use(require('./controllers/middleware/statics')); // import all serve-statics
		app.use(require('./controllers/middleware/routing'));

		var bodyParser = require('body-parser'); // for parsing requests
		app.use(bodyParser.urlencoded({extended: true}));
		console.log('Finished setting up middleware.');
		setupListen();
	}

	function setupListen(callback) {
		console.log('Setting up listen...');
		var port = process.env.PORT || 3000;
		app.listen(port);
		console.log('app listening to port: ' + port);
		console.log('Finished setting up port listening.');
	}
}