// mongoose is a global variable!

exports.roleSchema = roleSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	hoursRequired: {
		type: Number,
		required: true
	},
	hoursRaised: {
		type: Number,
		required: true
	},
	users: [{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			trim: true
		},
		hoursDonated: {
			type: Number,
			required: true
		}
	}]
});

var userSchema = require('./user.js').userSchema;

var Role = mongoose.model('Role', roleSchema);
var User = mongoose.model('User', userSchema);

exports.addRole = function addRole(newRole, callback) {

	// TODO verify role properties
	Role.create(newRole, function(err, role) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.updateRole = function updateRole(roleId, newInfo, callback) {
	
	// TODO verify newInfo
	Role.update({_id: mongoose.Types.ObjectId(roleId)}, newInfo, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeRole = function removeRole(roleId, callback) {
	
	// TODO remove events connected to user
	Role.remove({_id: mongoose.Types.ObjectId(roleId)}, function(err) {
		if(err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.getRole = function getRole(roleId, callback) {
	Role.findById(roleId).populate('users.user').exec(function(err, role) {
		if (err) {
			// TODO handle error
			return console.error(err);
		}
		callback(role);
	});
}

exports.addUser = function(roleId, userId, callback) {

	// TODO add role to user
	Role.findByIdAndUpdate(mongoose.Types.ObjectId(roleId), {$push: {'users': mongoose.Types.ObjectId(userId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}

exports.removeUser = function(roleId, userId, callback) {
	
	// TODO remove role from user
	Role.findByIdAndUpdate(mongoose.Types.ObjectId(roleId), {$pull: {'users': mongoose.Types.ObjectId(userId)}}, function(err, raw) {
		if (err) {
			return console.error(err);
			// TODO handle error
		}
	}, callback);
}