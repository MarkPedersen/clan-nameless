// LOAD PACKAGES
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;
var bcrypt		= require('bcrypt-nodejs')


// USER SCHEMA
var UserSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	role: { type: String, required: true }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next){
	var user = this;

	// hash the password only if the password has been changed or the user is new
	if(!user.isModified('password')) return next();

	// generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash){

		// change the password to the hashed version
		user.password = hash;
		next();
	});
})

// Method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);