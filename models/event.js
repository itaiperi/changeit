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
	roles: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role',
		required: true,
		trim: true
	}],
});

var userSchema = require('./user.js').userSchema;
var roleSchema = require('./role.js').roleSchema;

var Event = mongoose.model('Event', eventSchema);
var User = mongoose.model('User', userSchema);
var Role = mongoose.model('Role', roleSchema);

exports.add = function add(newEvent, callback) {

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

exports.update = function update(eventId, newInfo, callback) {

	// TODO verify newInfo
	Event.update({_id: mongoose.Types.ObjectId(eventId)}, newInfo, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.remove = function remove(eventId, callback) {
	
	// TODO remove event from creatorUser
	Event.remove({_id: mongoose.Types.ObjectId(eventId)}, function(err) {
		if(err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeAll = function removeAll(callback) {
	Event.remove({}, function(err) {
		if (err) {
			return console.error(err);
		}
	});
}

exports.get = function get(eventId, callback) {
	
	Event.findById(eventId).populate('creatorUser roles').exec(function(err, event) {
		if (err) {
			// TODO handle error
			return console.error(err);
		}
		callback(event);
	});
}

exports.getAll = function getAll(callback) {
	
	Event.find({}).sort('-fromDate').exec(function(err, events) {
		if (err) {
			return console.error(err);
		}
		callback(events);
	});
}

exports.getFeatured = function getFeatured(callback) {
	
	// TODO write algorithm to find featured
	var numFeaturedEvents = 6;
	Event.find({}).sort('-fromDate').limit(numFeaturedEvents).exec(function(err, events) {
		if (err) {
			return console.error(err);
		}
		callback(events);
	});
}

exports.addRole = function addRole(eventId, roleId, callback) {

	Event.findByIdAndUpdate(mongoose.Types.ObjectId(eventId), {$push: {'roles': mongoose.Types.ObjectId(roleId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeRole = function removeRole(eventId, roleId, callback) {
	
	Event.findByIdAndUpdate(mongoose.Types.ObjectId(eventId), {$pull: {'events': mongoose.Types.ObjectId(roleId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}