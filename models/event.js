// mongoose is a global variable!

exports.eventSchema = eventSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	creatorUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		trim: true
	},
	creationDate: {
		type: Date,
		required: true,
		trim: true
	},
	fromDate: {
		type: Date,
		required: true,
		trim: true
	},
	toDate: {
		type: Date,
		required: true,
		trim: true
	},
	address: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	image: {
		type: String,
		required: true,
		trim: true
	},
	roles: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Role',
		required: true,
		trim: true
	},
});

var Event = mongoose.model('Event', eventSchema);

exports.addEvent = function addEvent(newEvent, callback) {

	// TODO verify event properties
	// TODO verify user id
	newEvent.creationDate = Date.now();
	Event.create(newEvent, function(err, event) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.updateEvent = function updateEvent(eventId, newInfo, callback) {

	// TODO verify newInfo
	Event.update({_id: mongoose.Types.ObjectId(eventId)}, newInfo, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeEvent = function removeEvent(eventId, callback) {
	
	// TODO remove event from creatorUser
	Event.remove({_id: mongoose.Types.ObjectId(eventId)}, function(err) {
		if(err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.getEvent = function getEvent(eventId, callback) {
	
	Event.findById(eventId, function(err, event) {
		if (err) {
			// TODO handle error
			return console.error(err);
		}
		callback(event);
	});
}

exports.getAllEvents = function getAllEvents(callback) {
	
	Event.find({}).sort('-fromDate').exec(function(err, events) {
		if (err) {
			return console.error(err);
		}
		callback(events);
	});
}

exports.getFeaturedEvents = function getFeaturedEvents(callback) {
	
	// TODO write algorithm to find featured
	var numFeaturedEvents = 6;
	Event.find({}).sort('-fromDate').limit(numFeaturedEvents).exec(function(err, events) {
		if (err) {
			return console.error(err);
		}
		callback(events);
	});
}

exports.addRole = function(eventId, roleId, callback) {

	Event.findByIdAndUpdate(mongoose.Types.ObjectId(eventId), {$push: {'roles': mongoose.Types.ObjectId(roleId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeRole = function(eventId, roleId, callback) {
	
	Event.findByIdAndUpdate(mongoose.Types.ObjectId(eventId), {$pull: {'events': mongoose.Types.ObjectId(roleId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}