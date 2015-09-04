var express = require('express');
var router = new express.Router();

router.get('/', function(req, res) {
	res.sendFile(appRoot + sep + 'index.html');
});

router.get('/api/users/getUser/:id', function(req, res) {
	var users = require(appRoot + sep + 'models' + sep + 'user.js');
	users.getUser(req.params.id, function(user) {
		if(user) {
			res.json(user);
		} else {
			res.send(null);
		}
	});
});

router.get('/api/roles/getRole/:id', function(req, res) {
	var roles = require(appRoot + sep + 'models' + sep + 'role.js');
	roles.getRole(req.params.id, function(role) {
		if(role) {
			res.json(role);
		} else {
			res.send(null);
		}
	});
});

router.get('/api/events/getEvent/:id', function(req, res) {
	var events = require(appRoot + sep + 'models' + sep + 'event.js');
	events.getEvent(req.params.id, function(event) {
		if(event) {
			res.json(event);
		} else {
			res.send(null);
		}
	});
});

router.get('/api/events/getAllEvents/', function(req, res) {
	var events = require(appRoot + sep + 'models' + sep + 'event.js');
	events.getAllEvents(function(events) {
		if(events) {
			res.json(events);
		} else {
			res.send(null);
		}
	});
});

router.get('/api/events/getFeaturedEvents/', function(req, res) {
	var events = require(appRoot + sep + 'models' + sep + 'event.js');
	events.getFeaturedEvents(function(events) {
		if(events) {
			res.json(events);
		} else {
			res.send(null);
		}
	});
});

router.get('/api/initDB', function(req, res) {
	var users = require(appRoot + '/models/user.js');
	var events = require(appRoot + '/models/event.js');
	var roles = require(appRoot + '/models/role.js');
	for (var i = 0; i < 10; ++i) {
		var user = {
			_id: '00000000000000000000000'.concat(i),
			email: 'test' + i + '@test.com',
			password: 'password' + i,
			firstName: 'First' + i,
			lastName: 'Last' + i,
			phone: ''.concat(i,i,i,i,i,i,i,i,i,i),
			birthdate: Date.now(),
			gender: i%2 == 0 ? 'male' : 'female',
			bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra nec erat in gravida. Vestibulum sit amet sem nec massa lacinia tristique vel in lacus. Nulla euismod ultrices nulla ac bibendum. Cras quis volutpat velit, ac aliquet purus. Pellentesque molestie felis at lacus tempor tincidunt. Morbi lobortis, arcu non viverra iaculis, purus elit mattis risus, et congue odio erat at mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent eget suscipit massa. Suspendisse potenti. Pellentesque a accumsan turpis, non cursus lacus.',
			events: ['000000000000000000000'.concat(100+i)]
		}
		users.addUser(user);
	}

	for (var i = 0; i < 20; ++i) {
		var role = {
			_id: '000000000000000000000'.concat(parseInt(200+i)),
			title: 'Title' + i,
			description: 'password' + i,
			hoursRequired: 40+i,
			hoursRaised: 20+i*2,
			users: [{
				user: '00000000000000000000000'.concat(parseInt(i/2)),
				hoursDonated: 20+i*2
			}]
			
		}
		roles.addRole(role);
	}

	for (var i = 0; i < 10; ++i) {
		var event = {
			_id: '000000000000000000000'.concat(100+i),
			name: 'Test event ' + i,
			creatorUser: '00000000000000000000000' + i,
			creationDate: Date.now(),
			fromDate: Date.now(),
			toDate: Date.now(),
			address: 'Test address ' + i,
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra nec erat in gravida. Vestibulum sit amet sem nec massa lacinia tristique vel in lacus. Nulla euismod ultrices nulla ac bibendum. Cras quis volutpat velit, ac aliquet purus. Pellentesque molestie felis at lacus tempor tincidunt. Morbi lobortis, arcu non viverra iaculis, purus elit mattis risus, et congue odio erat at mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent eget suscipit massa. Suspendisse potenti. Pellentesque a accumsan turpis, non cursus lacus.',
			image: 'testimage.jpg',
			roles: [
				'000000000000000000000'.concat(200+i*2),
				'000000000000000000000'.concat(200+i*2+1)
			]
		}
		events.addEvent(event);
	}

	res.send('test');
});

module.exports = router;

console.log('Routing middleware set.');