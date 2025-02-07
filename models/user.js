// mongoose is a global variable!

exports.userSchema = userSchema = mongoose.Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	creationDate: {
		type: Date,
		required: true,
		trim: true
	},
	phone: {
		type: String,
		trim: true
	},
	birthdate: {
		type: Date
	},
	gender: {
		type: String,
		trim: true,
		enum: ['male', 'female']
	},
	bio: {
		type: String
	},
	events: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		trim: true
	}]
});

var eventSchema = require('./event.js').eventSchema;

var User = mongoose.model('User', userSchema);
var Event = mongoose.model('Event', eventSchema);

exports.add = function add(newUser, callback) {

	// TODO verify user properties
	newUser.creationDate = Date.now();
	User.create(newUser, function(err, user) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.update = function update(userId, newInfo, callback) {
	
	// TODO verify newInfo
	User.update({_id: mongoose.Types.ObjectId(userId)}, newInfo, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.remove = function remove(userId, callback) {
	
	// TODO remove events connected to user
	User.remove({_id: mongoose.Types.ObjectId(userId)}, function(err) {
		if(err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeAll = function removeAll(callback) {
	User.remove({}, function(err) {
		if (err) {
			return console.error(err);
		}
	});
}

exports.get = function get(userId, callback) {
	
	User.findById(userId).populate('events').exec(function(err, user) {
		if (err) {
			// TODO handle error
			return console.error(err);
		}
		callback(user);
	});
}

exports.addEvent = function(userId, eventId, callback) {

	// TODO verify that eventId exist
	User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), {$push: {'events': mongoose.Types.ObjectId(eventId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeEvent = function(userId, eventId, callback) {
	
	User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), {$pull: {'events': mongoose.Types.ObjectId(eventId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}