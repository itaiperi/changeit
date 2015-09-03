var express = require('express');
var router = new express.Router();

router.get('/', function(req, res) {
	res.sendFile(appRoot + '\\index.html');
});

module.exports = router;