const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		trim: true,
		minLength: 1,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			//validator: validator.isEmail,
			message: '{value} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

//Instance Methods
//overriding toJSON method to return only required values from the server
UserSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123');

	user.tokens.push({ access, token });

	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.removeToken = function(token){
	var user = this;

	//$pull is a mongoDB operator, which removes an item from an array depending on a criteria
	return user.update({
		$pull: {
			tokens: { token }
		}
		// pull from tokens array, any object on the array that has token property equal to token
	});
};

//Model method
UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	try{
		decoded = jwt.verify(token, 'abc123');
	} catch(e){
		// return new Promise((resolve, reject) => {
		// 	reject();
		// });

		return Promise.reject();
	}

	return User.findOne({ 
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'	//accessing nested properties
	});
}

UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;

	return User.findOne({email}).then((user) => {
		if(!user){
			return Promise.reject(); 
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if(res) resolve(user);
				else reject();
			});
		});
	});
}

//Mongoose Middleware
UserSchema.pre('save', function(next){
	var user = this;

	if(user.isModified('password')){
		var pwd = user.password;

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(pwd, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else{
		next();
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};